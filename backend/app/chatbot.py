from app.schemas import Query
from .config import settings

OPENAI_API_KEY = settings.OPENAI_API_KEY


def mock_chatbot_response(question: str) -> dict:
    mock_reply = "This is a sample AI reply."
    return {"query": question, "reply": mock_reply}


def openai_chatbot_response(question: str) -> dict:
    from openai import OpenAI

    client = OpenAI(
        api_key=OPENAI_API_KEY)

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "input_text",
                        "text": "You are a assistant working at a reception desk in a Hospital, help new patients with their query."
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": question
                    }
                ]
            }
        ],
        text={
            "format": {
                "type": "text"
            }
        },
        reasoning=None,
        tools=[],
        temperature=1,
        max_output_tokens=2048,
        top_p=1,
        store=True
    )
    output_text = response.output[0].content[0].text
    return {"query": question, "reply": output_text}


def chatbot_response(question: Query) -> dict:
    q = question.query
    if OPENAI_API_KEY:
        return openai_chatbot_response(q)
    else:
        return mock_chatbot_response(q)
