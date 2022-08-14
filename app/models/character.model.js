module.exports = mongoose => {
    const Character = mongoose.model(
      "character",
      mongoose.Schema(
        {
          id: String,
          name: String,
          kind: String,
          voiceActors:[{
            name : String,
            language : String
             }],
          films:[{
            name : String,
            ReleseDate : { type: String, default: Date }
             }]
        }
      )
    );
    return Character;
  };