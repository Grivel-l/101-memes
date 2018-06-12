use 101-memes
db.medias.update({tags: { $exists: false }}, { $set: { tags: [] } }, {multi: true})