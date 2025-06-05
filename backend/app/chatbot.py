from app.schemas import Query


def mock_chatbot_response(question: Query) -> dict:
    q = question.query
    mock_reply = "This is a sample AI reply."
    return {"query": q, "reply": mock_reply}
