from app.schemas import Query


def mock_chatbot_response(question: Query) -> dict:
    q = question.query

    # Apply basic prompt engineering
    _prompt = f"You are a helpful receptionist working in a hospital who handles new customer and their query. Answer this question: {q}"

    mock_reply = "This is a sample AI reply."
    return {"query": q, "reply": mock_reply}
