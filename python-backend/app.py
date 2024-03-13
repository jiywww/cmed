from flask import Flask, jsonify

app = Flask(__name__)

todos = [
    {"id": 1, "task": "Buy milk", "completed": False},
    {"id": 2, "task": "Study Python", "completed": True},
]


@app.route("/api/hello")
def hello_api():
    return jsonify({"message": "Hello, World!"})


@app.route("/api/todos")
def get_todos():
    return jsonify(todos)


if __name__ == "__main__":
    app.run(debug=True)
