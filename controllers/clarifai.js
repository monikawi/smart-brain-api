const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_API}`);


const handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
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

const handleImage = async (req, res, db) => {
  try {
    const { id } = req.body;
    const entries = await db('users').where('id', '=', id).increment('entries', 1).returning('entries');
    res.json(entries[0]);
  } catch (e) {
    res.status(400).json('Unable to get entries');
  }
}

module.exports = {
  handleImage,
  handleApiCall
}