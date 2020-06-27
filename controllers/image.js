const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '22cd2339cb414811894a88a224866285'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input)
            .then(data =>{
                res.json(data);
            }).catch(err => res.status(400).json('api error'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => res.status(400).json('unable to update'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall:handleApiCall
}