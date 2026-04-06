"""
ai_service.py
Wraps both OpenAI and Anthropic so you can use either.
Set AI_PROVIDER in your .env to "openai" or "anthropic".
Defaults to openai.
"""

import os
from openai import OpenAI
import anthropic

PROVIDER = os.getenv("AI_PROVIDER", "openai").lower()


def chat(system_prompt: str, user_message: str, max_tokens: int = 1000) -> str:
    """
    Send a message to the AI and get a response.
    Automatically uses whichever provider is set in .env
    """
    if PROVIDER == "anthropic":
        return _anthropic_chat(system_prompt, user_message, max_tokens)
    else:
        return _openai_chat(system_prompt, user_message, max_tokens)


def _openai_chat(system_prompt: str, user_message: str, max_tokens: int) -> str:
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_message},
        ],
        max_tokens=max_tokens,
    )
    return response.choices[0].message.content


def _anthropic_chat(system_prompt: str, user_message: str, max_tokens: int) -> str:
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=max_tokens,
        system=system_prompt,
        messages=[{"role": "user", "content": user_message}],
    )
    return response.content[0].text
