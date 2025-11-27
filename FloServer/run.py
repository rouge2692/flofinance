from app import app
from config import FLASK_SERVER_HOST, FLASK_SERVER_PORT, FLASK_DEBUG

if __name__ == "__main__":
    app.run(
        host=FLASK_SERVER_HOST,
        port=FLASK_SERVER_PORT,
        debug=FLASK_DEBUG,
    )
