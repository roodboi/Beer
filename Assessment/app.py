from flask import Flask, render_template, request
import os

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

#This will render a new page, with updated keywords
@app.route('/searchVids')
def index2():
    vidKey = request.args.get('keyword')
    return render_template('searchVids.html', videoKeyToShow=vidKey)


# if __name__ == '__main__':
#     app.debug = True
#     host = os.environ.get('IP', '0.0.0.0')
#     port = int(os.environ.get('PORT', 8080))
#     app.run(host=host, port=port)

if __name__ == '__main__':
    app.run()