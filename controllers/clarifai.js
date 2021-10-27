const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 54c0fff13c17457a98a4462bad67e5ae");


const handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
      // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
      model_id: "a403429f2ddf4b49b307e318f00e528b",
      inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
        return;
      }

      res.json(response);
    }
  );
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}


//OLD

// app.put('/count', (req, res) => {
//   const { id } = req.body;

//   knex('users')
//   .where('id', '=', id)
//   .increment('entries', 1)
//   .returning('entries')
//   .then(entries => res.json(entries[0]))
//   .catch(err => res.status(400).json('Unable to update entries'))
// })