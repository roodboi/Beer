from flask import Flask, render_template, request

app = Flask(__name__)


#This returns the home page
@app.route('/')
def hello_world():
    return render_template('index.html')


#This will render a single video with accompanying info and videos
@app.route('/video')
def vid():
    vidId = request.args.get('id')
    vidChannel = request.args.get('channel')
    return render_template('video.html', videoToShow=vidId,channelToShow=vidChannel)


if __name__ == '__main__':
    app.run()
