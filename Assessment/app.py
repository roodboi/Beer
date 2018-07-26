from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/video')
def vid():
    vidId = request.args.get('id')
    #password = request.args.get('password')
    #, urlparameter='http://www.stackoverflow.com'
    return render_template('video.html', videoToShow=vidId)


if __name__ == '__main__':
    app.run()
