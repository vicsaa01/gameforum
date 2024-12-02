const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Función para generar un identificador aleatorio, usada para generar un token de acceso cada vez que se inicia sesión

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// Conexión a MongoDB

mongoose.connect('mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_URL + '/?retryWrites=true&w=majority&appName=GameForum', {
  dbName: 'tfg',
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch((error) => console.error('Connection error:', error));

// Definición de esquemas para la base de datos

const usersSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  avatar: {type: String, required: true, default: 'default-user-avatar.png'},
  info: {type: String, required: true, default: '¡Hola, soy nuev@ en GameForum!'},
  created_at: {type: Date, required: true, default: Date.now()},
  is_admin: {type: Boolean, required: true, default: false}
});
const users = mongoose.model('Users', usersSchema);

const itemsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    info: {type: String, required: true, default: 'No hay información sobre este ítem.'},
    type: {type: String, required: true},
    genres: {type: String, required: true},
    icon: {type: String, required: true, default: 'default-item-icon.png'},
    points: {type: Number, required: true, default: 0},
    ratings: {type: Number, required: true, default: 0},
    creators: {type: String, required: false},
    producers: {type: String, required: false},
    year: {type: Number, required: true},
    country: {type: String, required: true},
    length: {type: String, required: false},
    platforms: {type: String, required: false}
  });
const items = mongoose.model('Items', itemsSchema);

const listsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  scope: {type: String, required: false},
  creator_id: {type: String, required: true},
  created_at: {type: Date, required: true, default: Date.now()},
  views: {type: Number, required: true, default: 0}
});
const lists = mongoose.model('Lists', listsSchema);

const groupsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  logo: {type: String, required: true, default: 'default-group-logo.png'},
  creator_id: {type: String, required: true},
  created_at: {type: Date, required: true, default: Date.now()},
  members: {type: Number, required: true, default: 0},
  items: {type: Number, required: true, default: 0}
});
const groups = mongoose.model('Groups', groupsSchema);

const discussionsSchema = new mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  tags: {type: String, required: false},
  group_id: {type: String, required: true},
  creator_id: {type: String, required: true},
  created_at: {type: Date, required: true, default: Date.now()},
  likes: {type: Number, required: true, default: 0},
  dislikes: {type: Number, required: true, default: 0}
});
const discussions = mongoose.model('Discussions', discussionsSchema);

const requestsSchema = new mongoose.Schema({
  user: {type: String, required: true},
  group: {type: String, required: true},
  is_invite: {type: Boolean, required: true},
  created_at: {type: Date, required: true, default: Date.now()}
});
const requests = mongoose.model('Requests', requestsSchema);



const commentsSchema = new mongoose.Schema({
  discussion: {type: String, required: false},
  item: {type: String, required: false},
  user: {type: String, required: true},
  text: {type: String, required: true},
  created_at: {type: Date, required: true, default: Date.now()},
  likes: {type: Number, required: true, default: 0},
  dislikes: {type: Number, required: true, default: 0}
});
const comments = mongoose.model('Comments', commentsSchema);

const recommendationsSchema = new mongoose.Schema({
  item: {type: String, required: true},
  recommended_item: {type: String, required: true},
  likes: {type: Number, required: true, default: 0},
  dislikes: {type: Number, required: true, default: 0}
});
const recommendations = mongoose.model('Recommendations', recommendationsSchema);

const listelementsSchema = new mongoose.Schema({
  item: {type: String, required: true},
  list: {type: String, required: true},
  votes: {type: Number, required: false, default: 0},
  prev: {type: String, required: false, default: ""}
});
const listelements = mongoose.model('Listelements', listelementsSchema);

const favoriteitemsSchema = new mongoose.Schema({
  item: {type: String, required: true},
  group: {type: String, required: true}
});
const favoriteitems = mongoose.model('Favoriteitems', favoriteitemsSchema);

const membersSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  group_id: {type: String, required: true},
  is_mod: {type: Boolean, required: true, default: false}
});
const members = mongoose.model('Members', membersSchema);





// Poner en marcha el servidor

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





// Rutas para consultar un objeto buscando por su ID

app.get('/user', async (req, res) => {
  id = req.query.id;
  try {
    const userList = await users.findById(id);
    res.json(userList);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});

app.get('/item', async (req, res) => {
  id = req.query.id;
  try {
    const itemList = await items.findById(id);
    res.json(itemList);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});

app.get('/list', async (req, res) => {
  id = req.query.id;
  try {
    const listList = await lists.findById(id);
    res.json(listList);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});

app.get('/group', async (req, res) => {
  id = req.query.id;
  try {
    const group = await groups.findById(id);
    res.json(group);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});

app.get('/discussion', async (req, res) => {
  id = req.query.id;
  try {
    const discussionsList = await discussions.findById(id);
    res.json(discussionsList);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});

app.get('/request', async (req, res) => {
  id = req.query.id;
  try {
    const requestsList = await requests.findById(id);
    res.json(requestsList);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});



app.get('/comment', async (req, res) => {
  id = req.query.id;
  try {
    const commentsList = await comments.findById(id);
    res.json(commentsList);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});

app.get('/recommendation', async (req, res) => {
  id = req.query.id;
  try {
    const recommendationsList = await recommendations.findById(id);
    res.json(recommendationsList);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});

app.get('/list-element', async (req, res) => {
  id = req.query.id;
  try {
    const list_element = await listelements.findById(id);
    res.json(list_element);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});

app.get('/member', async (req, res) => {
  id = req.query.id;
  try {
    const member = await members.findById(id);
    res.json(member);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});

app.get('/favorite-item', async (req, res) => {
  id = req.query.id;
  try {
    const favorite_item = await favoriteitems.findById(id);
    res.json(favorite_item);
  } catch (e) {
    res.json({message: 'Error: ' + e});
  }
});





// Rutas para consultar las listas de ítems más nuevos, según el tipo

app.get('/newest-items', async (req, res) => {
  const itemList = await items.find().sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  res.json(itemList);
});

app.get('/newest-music', async (req, res) => {
  const itemList = await items.find({type: 'música'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  res.json(itemList);
});

app.get('/newest-games', async (req, res) => {
  const itemList = await items.find({type: 'videojuego'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  res.json(itemList);
});

app.get('/newest-movies', async (req, res) => {
  const itemList = await items.find({type: 'película'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  res.json(itemList);
});

app.get('/newest-tv', async (req, res) => {
  const itemList = await items.find({type: 'serie'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  res.json(itemList);
});

app.get('/newest-books', async (req, res) => {
  const itemList = await items.find({type: 'libro'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  res.json(itemList);
});





// Rutas para consultar las listas de ítems más populares, según el tipo

app.get('/popular-items', async (req, res) => {
  const itemList = await items.find().sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  res.json(itemList);
});

app.get('/popular-music', async (req, res) => {
  genre = req.query.genre;
  var itemList = []
  if (genre=='all'){
    itemList = await items.find({type: 'música'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  } else {
    itemList = await items.find({type: 'música', genres: genre}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  }
  res.json(itemList);
});

app.get('/popular-games', async (req, res) => {
  genre = req.query.genre;
  var itemList = []
  if (genre=='all'){
    itemList = await items.find({type: 'videojuego'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  } else {
    itemList = await items.find({type: 'videojuego', genres: genre}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  }
  res.json(itemList);
});

app.get('/popular-movies', async (req, res) => {
  genre = req.query.genre;
  var itemList = []
  if (genre=='all'){
    itemList = await items.find({type: 'película'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  } else {
    itemList = await items.find({type: 'película', genres: genre}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  }
  res.json(itemList);
});

app.get('/popular-tv', async (req, res) => {
  genre = req.query.genre;
  var itemList = []
  if (genre=='all'){
    itemList = await items.find({type: 'serie'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  } else {
    itemList = await items.find({type: 'serie', genres: genre}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  }
  res.json(itemList);
});

app.get('/popular-books', async (req, res) => {
  genre = req.query.genre;
  var itemList = []
  if (genre=='all'){
    itemList = await items.find({type: 'libro'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  } else {
    itemList = await items.find({type: 'libro', genres: genre}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  }
  res.json(itemList);
});





// Routes for the Community section

app.get('/lists', async (req, res) => {
  const listList = await lists.find().sort({views: 'desc'}).select('_id -name -type -scope -creator_id -created_at -views -__v');
  res.json(listList);
});

app.get('/groups', async (req, res) => {
  const groupList = await groups.find().sort({members: 'desc'}).select('_id -name -type -logo -creator_id -created_at -members -items -__v');
  res.json(groupList);
});





// List

app.get('/list-elements', async (req, res) => {
  id = req.query.id;
  const elements = await listelements.find({list: id}).sort({votes: 'desc'}).select('_id -item -list -votes -prev -__v');
  res.json(elements);
});

app.get('/view-list', async (req, res) => {
  id = req.query.id;
  const result = await lists.updateOne({_id: id}, { $inc: {views: 1}});
  res.json({modified: result.modifiedCount});
})

app.get('/vote-list-element', async (req, res) => {
  id = req.query.id;
  const result = await listelements.updateOne({_id: id}, { $inc: {votes: 1}});
  const element = await listelements.findById(id);
  res.json(element);
})

app.get('/delete-list-element', async (req, res) => {
  id = req.query.id;
  const result = await listelements.findOneAndDelete({_id: id});
  console.log(result)
  res.json(result);
})





// Group

app.get('/members', async (req, res) => {
  group_id = req.query.group_id;
  const membersList = await members.find({group_id: group_id}).select('_id -user_id -group_id -is_mod -__v');
  res.json(membersList);
});

app.get('/favorite-items', async (req, res) => {
  group_id = req.query.group_id;
  const itemsList = await favoriteitems.find({group: group_id}).select('_id -item -group -__v');
  res.json(itemsList);
});

app.get('/popular-discussions', async (req, res) => {
  group_id = req.query.group_id;
  const discussionsList = await discussions.find({group_id: group_id}).sort({likes: 'desc'}).select('_id -title -text -tags -group_id -creator_id -created_at -likes -dislikes -__v');
  res.json(discussionsList);
});

app.get('/new-discussions', async (req, res) => {
  group_id = req.query.group_id;
  const discussionsList = await discussions.find({group_id: group_id}).sort({created_at: 'desc'}).select('_id -title -text -tags -group_id -creator_id -created_at -likes -dislikes -__v');
  res.json(discussionsList);
});

app.get('/old-discussions', async (req, res) => {
  group_id = req.query.group_id;
  const discussionsList = await discussions.find({group_id: group_id}).sort({created_at: 'asc'}).select('_id -title -text -tags -group_id -creator_id -created_at -likes -dislikes -__v');
  res.json(discussionsList);
});

app.get('/controversial-discussions', async (req, res) => {
  group_id = req.query.group_id;
  const discussionsList = await discussions.find({group_id: group_id}).sort({dislikes: 'desc'}).select('_id -title -text -tags -group_id -creator_id -created_at -likes -dislikes -__v');
  res.json(discussionsList);
});





// Requests to join

app.get('/requests', async (req, res) => {
  group_id = req.query.group_id;
  const requestsList = await requests.find({group: group_id, is_invite: false}).sort({created_at: 'desc'}).select('_id -user -group -is_invite -created_at -__v');
  res.json(requestsList);
})

app.get('/invites', async (req, res) => {
  user_id = req.query.user_id;
  const requestsList = await requests.find({user: user_id, is_invite: true}).sort({created_at: 'desc'}).select('_id -user -group -is_invite -created_at -__v');
  res.json(requestsList);
})



app.post('/invite-user', async (req, res) => {
  const searchList = await groups.find({name: req.body.group}).select('_id -name -type -logo -creator_id -created_at -members -items -__v');
  if (searchList.length > 0) {  
    const group_id = searchList[0]._id;
    const moderator = await members.find({group_id: group_id, user_id: req.body.sender, is_mod: true}).select('_id -user_id -group_id -is_mod -__v');
    if (moderator.length > 0) {
      const membersList = await members.find({user_id: req.body.user, group_id: group_id}).select('_id -user_id -group_id -is_mod -__v');
      if (membersList.length==0){
        insertData = {'user': req.body.user, 'group': group_id, 'is_invite': true, 'created_at': Date.now()};
        const newRequest = new requests(insertData);
        newRequest.save();
        res.status(201).json({message: 'Se ha enviado la invitación', user: req.body.user});
      } else {
        res.status(200).json({message: 'El usuario ya forma parte de este grupo'});
      }
    } else {
      res.status(401).json({message: 'Debes ser un moderador del grupo para poder enviar invitaciones.'});
    }
  } else {
    res.status(404).json({message: 'No se ha encontrado ningún grupo llamado ' + req.body.group});
  }
})

app.post('/send-request', async (req, res) => {
  const membersList = await members.find({user_id: req.body.user, group_id: req.body.group}).select('_id -user_id -group_id -is_mod -__v');
  if (membersList.length==0){
    insertData = {'user': req.body.user, 'group': req.body.group, 'is_invite': false, 'created_at': Date.now()};
    const newRequest = new requests(insertData);
    newRequest.save();
    res.json({message: 'Se ha enviado la solicitud'});
  } else {
    res.json({message: 'Ya formas parte de este grupo'});
  }
})

app.post('/join-group', async (req, res) => {
  const membersList = await members.find({user_id: req.body.user, group_id: req.body.group}).select('_id -user_id -group_id -is_mod -__v');
  if (membersList.length==0){
    insertData = {'user_id': req.body.user, 'group_id': req.body.group, 'is_mod': false};
    const newMember = new members(insertData);
    newMember.save();
    const update = await groups.updateOne({_id: req.body.group}, { $inc: {members: 1}});
    res.json({message: 'Te has unido al grupo'});
  } else {
    res.json({message: 'Ya formas parte de este grupo'});
  }
})



app.get('/accept-request', async (req, res) => {
  id = req.query.id;
  const requestList = await requests.find({_id: id}).select('_id -user -group -is_invite -created_at -__v');
  const request = await requests.findById(id);

  // add member
  insertData = {'user_id': request.user, 'group_id': request.group, 'is_mod': false};
  const newMember = new members(insertData);
  newMember.save();

  // update group and remove request
  const update = await groups.updateOne({_id: request.group}, { $inc: {members: 1}});
  const deletion = await requests.findOneAndDelete({_id: id});

  res.json({modified: requestList.length});
})

app.get('/reject-request', async (req, res) => {
  id = req.query.id;
  const requestList = await requests.find({_id: id}).select('_id -user -group -is_invite -created_at -__v');
  const result = await requests.findOneAndDelete({_id: id});
  res.json({modified: requestList.length});
})



// check if member

app.get('/is-member', async (req, res) => {
  const membersList = await members.find({user_id: req.query.user, group_id: req.query.group}).select('_id -user_id -group_id -is_mod -__v');
  console.log(membersList);
  if (membersList.length > 0) res.json({member: true})
  else res.json({member: false})
})





// Comments

app.get('/popular-discussion-comments', async (req, res) => {
  discussion = req.query.discussion_id;
  const commentsList = await comments.find({discussion: discussion}).sort({likes: 'desc'}).select('_id -discussion -item -user -text -created_at -likes -dislikes -__v');
  res.json(commentsList);
});

app.get('/old-discussion-comments', async (req, res) => {
  discussion = req.query.discussion_id;
  const commentsList = await comments.find({discussion: discussion}).sort({created_at: 'asc'}).select('_id -discussion -item -user -text -created_at -likes -dislikes -__v');
  res.json(commentsList);
});

app.get('/new-discussion-comments', async (req, res) => {
  discussion = req.query.discussion_id;
  const commentsList = await comments.find({discussion: discussion}).sort({created_at: 'desc'}).select('_id -discussion -item -user -text -created_at -likes -dislikes -__v');
  res.json(commentsList);
});

app.get('/controversial-discussion-comments', async (req, res) => {
  discussion = req.query.discussion_id;
  const commentsList = await comments.find({discussion: discussion}).sort({dislikes: 'desc'}).select('_id -discussion -item -user -text -created_at -likes -dislikes -__v');
  res.json(commentsList);
});



app.get('/popular-item-comments', async (req, res) => {
  item = req.query.item_id;
  const commentsList = await comments.find({item: item}).sort({likes: 'desc'}).select('_id -discussion -item -user -text -created_at -likes -dislikes -__v');
  res.json(commentsList);
});

app.get('/old-item-comments', async (req, res) => {
  item = req.query.item_id;
  const commentsList = await comments.find({item: item}).sort({created_at: 'asc'}).select('_id -discussion -item -user -text -created_at -likes -dislikes -__v');
  res.json(commentsList);
});

app.get('/new-item-comments', async (req, res) => {
  item = req.query.item_id;
  const commentsList = await comments.find({item: item}).sort({created_at: 'desc'}).select('_id -discussion -item -user -text -created_at -likes -dislikes -__v');
  res.json(commentsList);
});

app.get('/controversial-item-comments', async (req, res) => {
  item = req.query.item_id;
  const commentsList = await comments.find({item: item}).sort({dislikes: 'desc'}).select('_id -discussion -item -user -text -created_at -likes -dislikes -__v');
  res.json(commentsList);
});



app.post('/add-discussion-comment', (req, res) => {
  insertData = {'text': req.body.text, 'discussion': req.body.discussion, 'user': req.body.user, 'created_at': Date.now()};
  const newComment = new comments(insertData);
  newComment.save();
  res.status(201).json(newComment);
})

app.post('/add-item-comment', (req, res) => {
  insertData = {'text': req.body.text, 'item': req.body.item, 'user': req.body.user, 'created_at': Date.now()};
  const newComment = new comments(insertData);
  newComment.save();
  res.status(201).json(newComment);
})





// Recommendations

app.get('/recommendations', async (req, res) => {
  item_id = req.query.item_id;
  const recommendationsList = await recommendations.find({item: item_id}).sort({likes: 'desc'}).select('_id -item -recommended_item -likes -dislikes -__v');
  res.json(recommendationsList);
});

app.post('/add-recommendation', async (req, res) => {
  const searchList = await items.find({name: req.body.name, type: req.body.type}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
  if (searchList.length > 0) {  
    const recommended_item = searchList[0]._id;
    if (recommended_item != req.body.item) {
      insertData = {'item': req.body.item, 'recommended_item': recommended_item};
      const newRecommendation = new recommendations(insertData);
      newRecommendation.save();
      res.status(201).json({message: 'Se ha añadido la recomendación', item: req.body.item});
    } else {
      res.status(401).json({message: 'El ítem recomendado no puede ser el mismo que ítem donde aparece la recomendación'});
    }
  } else {
    res.status(404).json({message: 'No se ha encontrado ningún ítem llamado ' + req.body.name + ' y de tipo ' + req.body.type});
  }
})





// Likes and dislikes

app.get('/like-discussion', async (req, res) => {
  id = req.query.id;
  const result = await discussions.updateOne({_id: id}, { $inc: {likes: 1}});
  const discussion = await discussions.findById(id);
  res.json(discussion);
})

app.get('/not-like-discussion', async (req, res) => {
  id = req.query.id;
  const result = await discussions.updateOne({_id: id}, { $inc: {likes: -1}});
  const discussion = await discussions.findById(id);
  res.json(discussion);
})

app.get('/dislike-discussion', async (req, res) => {
  id = req.query.id;
  const result = await discussions.updateOne({_id: id}, { $inc: {dislikes: 1}});
  const discussion = await discussions.findById(id);
  res.json(discussion);
})

app.get('/not-dislike-discussion', async (req, res) => {
  id = req.query.id;
  const result = await discussions.updateOne({_id: id}, { $inc: {dislikes: -1}});
  const discussion = await discussions.findById(id);
  res.json(discussion);
})



app.get('/like-comment', async (req, res) => {
  id = req.query.id;
  const result = await comments.updateOne({_id: id}, { $inc: {likes: 1}});
  const comment = await comments.findById(id);
  res.json(comment);
})

app.get('/not-like-comment', async (req, res) => {
  id = req.query.id;
  const result = await comments.updateOne({_id: id}, { $inc: {likes: -1}});
  const comment = await comments.findById(id);
  res.json(comment);
})

app.get('/dislike-comment', async (req, res) => {
  id = req.query.id;
  const result = await comments.updateOne({_id: id}, { $inc: {dislikes: 1}});
  const comment = await comments.findById(id);
  res.json(comment);
})

app.get('/not-dislike-comment', async (req, res) => {
  id = req.query.id;
  const result = await comments.updateOne({_id: id}, { $inc: {dislikes: -1}});
  const comment = await comments.findById(id);
  res.json(comment);
})



app.get('/like-recommendation', async (req, res) => {
  id = req.query.id;
  const result = await recommendations.updateOne({_id: id}, { $inc: {likes: 1}});
  const recommendation = await recommendations.findById(id);
  res.json(recommendation);
})

app.get('/not-like-recommendation', async (req, res) => {
  id = req.query.id;
  const result = await recommendations.updateOne({_id: id}, { $inc: {likes: -1}});
  const recommendation = await recommendations.findById(id);
  res.json(recommendation);
})

app.get('/dislike-recommendation', async (req, res) => {
  id = req.query.id;
  const result = await recommendations.updateOne({_id: id}, { $inc: {dislikes: 1}});
  const recommendation = await recommendations.findById(id);
  res.json(recommendation);
})

app.get('/not-dislike-recommendation', async (req, res) => {
  id = req.query.id;
  const result = await recommendations.updateOne({_id: id}, { $inc: {dislikes: -1}});
  const recommendation = await recommendations.findById(id);
  res.json(recommendation);
})





// Ratings

app.post('/rate-item', async (req, res) => {
  id = req.query.id;
  const result = await items.updateOne({_id: id}, { $inc: {points: req.body.points, ratings: 1}});
  const item = await items.findById(id);
  res.status(200).json(item);
})





// Route for the Search system

app.get('/search', async (req, res) => {
  string = req.query.string;
  orderby = req.query.orderby;
  filterby = req.query.filterby;
  var searchList = [];

  switch (filterby) {
    case 'all':
      if (orderby == 'popular') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else if (orderby == 'newest') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else {
        searchList = await items.find({name: {$regex: string, $options: 'i'}}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      }
      break;

    case 'music':
      if (orderby == 'popular') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'música'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else if (orderby == 'newest') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'música'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'música'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      }
      break;

    case 'games':
      if (orderby == 'popular') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'videojuego'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else if (orderby == 'newest') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'videojuego'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'videojuego'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      }
      break;

    case 'movies':
      if (orderby == 'popular') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'película'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else if (orderby == 'newest') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'película'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'película'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      }
      break;

    case 'tv':
      if (orderby == 'popular') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'serie'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else if (orderby == 'newest') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'serie'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'serie'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      }
      break;

    case 'books':
      if (orderby == 'popular') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'libro'}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else if (orderby == 'newest') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'libro'}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else {
        searchList = await items.find({name: {$regex: string, $options: 'i'}, type: 'libro'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      }
      break;

    case 'groups':
      if (orderby == 'popular') {
        searchList = await groups.find({name: {$regex: string, $options: 'i'}}).sort({members: 'desc'}).select('_id -name -type -logo -creator_id -created_at -members -items -__v');
      } else if (orderby == 'newest') {
        searchList = await groups.find({name: {$regex: string, $options: 'i'}}).sort({created: 'desc'}).select('_id -name -type -logo -creator_id -created_at -members -items -__v');
      } else {
        searchList = await groups.find({name: {$regex: string, $options: 'i'}}).select('_id -name -type -logo -creator_id -created_at -members -items -__v');
      }
      break;

    case 'lists':
      if (orderby == 'popular') {
        searchList = await lists.find({name: {$regex: string, $options: 'i'}}).sort({views: 'desc'}).select('_id -name -type -scope -creator_id -created_at -views -__v');
      } else if (orderby == 'newest') {
        searchList = await lists.find({name: {$regex: string, $options: 'i'}}).sort({created: 'desc'}).select('_id -name -type -scope -creator_id -created_at -views -__v');
      } else {
        searchList = await lists.find({name: {$regex: string, $options: 'i'}}).select('_id -name -type -scope -creator_id -created_at -views -__v');
      }
      break;

    case 'discussions':
      if (orderby == 'popular') {
        searchList = await discussions.find({title: {$regex: string, $options: 'i'}}).sort({likes: 'desc'}).select('_id -title -text -tags -created -creator -likes -group');
      } else if (orderby == 'newest') {
        searchList = await discussions.find({title: {$regex: string, $options: 'i'}}).sort({created: 'desc'}).select('_id -title -text -tags -created -creator -likes -group');
      } else {
        searchList = await discussions.find({title: {$regex: string, $options: 'i'}}).select('_id -title -text -tags -created -creator -likes -group');
      }
      break;

    default:
      if (orderby == 'popular') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}}).sort({points: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else if (orderby == 'newest') {
        searchList = await items.find({name: {$regex: string, $options: 'i'}}).sort({year: 'desc'}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      } else {
        searchList = await items.find({name: {$regex: string, $options: 'i'}}).select('_id -name -icon -info -type -year -points -ratings -genres -platforms -studio -country -directors -length');
      }
      break;
  }
  res.json(searchList);
});





// Add item to list/group

app.post('/add-to-list', async (req, res) => {
  const searchList = await lists.find({name: req.body.list}).select('_id -name -type -scope -creator_id -created_at -items -views -__v');
  if (searchList.length > 0) { 
    const list_id = searchList[0]._id;
    const list = await lists.findById(list_id);
    if (list.creator_id == req.body.sender) {
      const itemsList = await listelements.find({item: req.body.item, list: list_id}).select('_id -item -list -votes -prev -__v');
      if (itemsList==0){
        if (list.type == 'clasificación') {
          insertData = {'item': req.body.item, 'list': list_id, 'prev': ""}; // prev has to be set
        } else {
          insertData = {'item': req.body.item, 'list': list_id};
        }
        const newListElement = new listelements(insertData);
        newListElement.save();
        const update = await lists.updateOne({_id: list_id}, { $inc: {items: 1}}); // not working!!!
        console.log(update)
        res.status(201).json({message: 'El ítem ha sido añadido a la lista.', item: req.body.item});
      } else {
        res.status(200).json({message: 'El ítem ya está incluido en la lista.'});
      }
    } else {
      res.status(401).json({message: 'Debes ser el/la propietario/propietaria de la lista para poder añadir el ítem.'});
    }
  } else {
    res.status(404).json({message: 'No se ha encontrado ninguna lista llamada "' + req.body.list + '"'});
  }
})

app.post('/add-to-group', async (req, res) => {
  const searchList = await groups.find({name: req.body.group}).select('_id -name -type -logo -creator_id -created_at -members -items -__v');
  if (searchList.length > 0) {  
    const group_id = searchList[0]._id;
    const moderator = await members.find({group_id: group_id, user_id: req.body.sender, is_mod: true}).select('_id -user_id -group_id -is_mod -__v');
    if (moderator.length > 0) {
      const itemsList = await favoriteitems.find({item: req.body.item, group: group_id}).select('_id -item -group -__v');
      if (itemsList.length==0) {
        insertData = {'item': req.body.item, 'group': group_id};
        const newFavoriteItem = new favoriteitems(insertData);
        newFavoriteItem.save();
        const update = await groups.updateOne({_id: group_id}, { $inc: {items: 1}});
        res.status(201).json({message: 'El ítem ha sido añadido al grupo.', item: req.body.item});
      } else {
        res.status(200).json({message: 'El ítem ya está incluido en el grupo.'});
      }
    } else {
      res.status(401).json({message: 'Debes ser un moderador del grupo para poder añadir el ítem.'});
    }
  } else {
    res.status(404).json({message: 'No se ha encontrado ningún grupo llamado "' + req.body.group + '"'});
  }
})





// Rutas para crear objetos ítem, lista, grupo o discusión

app.post('/create-list', (req, res) => {
  insertData = {'name': req.body.name, 'type': req.body.type, 'scope': req.body.scope, 'creator_id': req.body.creator_id, 'created_at': Date.now()};
  const newList = new lists(insertData);
  newList.save();
  console.log(newList);
  res.status(201).json(newList);
})

app.post('/create-group', (req, res) => {
  // Crear grupo
  insertData = {'name': req.body.name, 'type': req.body.type, 'creator_id': req.body.creator_id, 'created_at': Date.now(), 'members': 1};
  const newGroup = new groups(insertData);
  newGroup.save();
  console.log(newGroup);

  // Añadir miembro
  insertData = {'user_id': req.body.creator_id, 'group_id': newGroup._id, 'is_mod': true};
  const newMember = new members(insertData);
  newMember.save();
  console.log(newMember);

  res.status(201).json(newGroup);
})

app.post('/create-discussion', (req, res) => {
  insertData = {'title': req.body.title, 'text': req.body.text, 'tags': req.body.tags, 'group_id': req.body.group_id, 'creator_id': req.body.creator_id, 'created_at': Date.now()};
  const newDiscussion = new discussions(insertData);
  newDiscussion.save();
  console.log(newDiscussion);
  res.status(201).json(newDiscussion);
})

app.post('/add-item', (req, res) => {
  insertData = {'name': req.body.name, 'info': req.body.info, 'type': req.body.type, 'genres': req.body.genres, 'year': req.body.year, 'country': req.body.country, 'creators': req.body.creators, 'producers': req.body.producers, 'length': req.body.length, 'platforms': req.body.platforms};
  const newItem = new items(insertData);
  newItem.save();
  console.log(newItem);
  res.status(201).json(newItem);
})





// Routes for editing objects

app.post('/edit-list', async (req, res) => {
  id = req.query.id;
  insertData = {name: req.body.name, scope: req.body.scope};
  const result = await lists.updateOne({_id: id}, insertData);
  console.log('Modified lists: ' + result.modifiedCount);
  res.status(200).json({modified: result.modifiedCount});
})

app.post('/edit-group', async (req, res) => {
  id = req.query.id;
  insertData = {name: req.body.name, type: req.body.type};
  const result = await groups.updateOne({_id: id}, insertData);
  console.log('Modified groups: ' + result.modifiedCount);
  res.status(200).json({modified: result.modifiedCount});
})

app.post('/edit-user', async (req, res) => {
  id = req.query.id;
  insertData = {name: req.body.name, info: req.body.info};
  const result = await users.updateOne({_id: id}, insertData);
  console.log('Modified users: ' + result.modifiedCount);
  res.status(200).json({modified: result.modifiedCount});
})





// Rutas para el registro de usuario y el inicio de sesión

app.post('/register', async (req, res) => {
  insertData = {'name': req.body.name, 'email': req.body.email, 'password': req.body.pass, 'created_at': Date.now()};

  // Comprobar que el nombre de usuario no se ha usado antes
  const user = await users.find({name: req.body.name});
  if (user.length == 0) {
    // Crear usuario
    const newUser = new users(insertData);
    newUser.save();
    res.status(201).json(newUser);
  } else {
    res.status(401).json({message: 'El nombre de usuario ya existe'});
  }
})

app.post('/auth', async (req, res) => {
  const user = await users.find({name: req.body.name});
  if (user.length == 1) {
    // Si se encuentra el nombre de usuario y la contraseña coincide,
    // devolver una respuesta con la ID del usuario y un token de acceso aleatorio
    if (user[0].password == req.body.pass) {
      res.status(200).json({message: 'Se ha iniciado sesión', user_id: user[0]._id, access_token: makeid(16)});
    }
    // Si se encuentra el nombre de usuario pero la contraseña no coincide, devolver un error 401 Unauthorized
    else {
      res.status(401).json({message: 'Contraseña incorrecta'});
    }
  }
  // Si no se encuentra el nombre de usuario, devolver un error 401 Unauthorized
  else {
    res.status(401).json({message: 'El usuario no existe'});
  }
})

app.post('/reset-pass', async (req, res) => {
  const user = await users.find({name: req.body.name});
  if (user.length == 1) {
    if (user[0].email == req.body.email) {
      res.status(200).json({message: 'Se enviará un correo para restablecer la contraseña', email: true});

      // Enviar correo (no completado)

    } else {
      res.status(401).json({message: 'El correo electrónico no coincide con el del usuario', email: false});
    }
  } else {
    res.status(401).json({message: 'El usuario no existe', email: false});
  }
})