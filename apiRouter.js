const express = require("express")
const schemas = require("./schemas")
const mongoose = require("mongoose")
const API = express.Router()
const newsAPI = require("./dataRoutes/newsAPI")
const memberApi = require("./dataRoutes/memberAPI")
const ProfileAPI = require("./dataRoutes/profileAPI")
const ProjectsAPI = require("./dataRoutes/projectsAPI")
const PostsAPI = require("./dataRoutes/postsAPI")
const ArtAPI = require("./dataRoutes/artAPI")


// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart({
//     storage: 'vedik'
// });

// var azure = require('azure-storage');
// var blobStorage = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=vedikstorage;AccountKey=7OmeGweYiFuBYd+/nzBAj3chFHo0vycwFc95s2yfbYpDOEbVPEnHY1lI5KWZms2G7O1//8F1JmGt2jcueom8jg==;EndpointSuffix=core.windows.net");

mongoose.set('useFindAndModify', false);


const MemberModal = mongoose.model("Member", schemas.memberSchema)
const projectsModal = mongoose.model("Projects", schemas.projectsSchema)
const postsModal = mongoose.model("Posts", schemas.postSchema)
const artModal = mongoose.model("Articles", schemas.artSchema)


/*
News Section All the GET and POST Request related
to news component will be Handled Here
*/

const newsModel = mongoose.model("News", schemas.newsSchema)
API.route("/news")
    .get((req, res) => {
        newsAPI.getNews(newsModel).then((val) => {res.send(val);});
    })
    .post((req, res) => {
        try {
            if (req.body != null) {
                const news = new newsModel({
                    news: req.body.news,
                    uploadedBy: req.body.uploadedBy,
                    time: req.body.time
                })

            }
        } catch (err) {
            res.status(400)
            console.log(err)
        }
    })
/*
End Of News Secion
*/

/*
Profile Section All POST related 
to members component will be Handled Here
*/

API.get("/member", (req, res)=>{
    memberApi.getMember(MemberModal).then((val)=>{res.send(val)}).catch((err)=>{console.log(err)})
})

/*
End of Member Section
*/



/*
Profile Section All GET and POST related 
to profile component will be Handled Here
*/
API.route('/profile')
        .get( (req, res) => {
            ProfileAPI.getProfile(MemberModal, req.query.username).then((val) => {res.send(val)}).catch((err) => {console.error(err)})
        })
        .post( async (req, res) => {
            try{
                if(req.body != null)
                {
                    ProfileAPI.updateProfile(MemberModal, req.body, req.query.username).then((val) =>{res.send(val)}).catch((err) =>{console.error(err)})
                }
            } catch(err){
                res.status(400)
                console.log(err)
            }
        })

/*
End of Profile Section
 */


/*
Project Section All GET and POST related 
to profile component will be Handled Here
 */

API.route('/projects')
        .get( (req, res) => {

            if(req.query.id) {
                //To get the Projects by id
                ProjectsAPI.getProjectsById(projectsModal, req.query.id).then((val) => {res.send(val)}).catch(err => {console.error(err)})
            }
            else{
                //To get the Project
                ProjectsAPI.getProjects(projectsModal).then((val) => {res.send(val)}).catch((err) => {console.error(err)})
            }
            
        })
        .post( (req, res) => {
            try {
                if(req.body != null)
                {
                    //To insert the project
                    const project = new projectsModal({
                        name : req.body.name,
                        about : req.body.about,
                        images : req.body.images,
                        icon : req.body.icon,
                        developer : req.body.developer,
                        title : req.body.title,
                        time: req.body.time
                    })

                    ProjectsAPI.insertProjects(project).then((val) => {res.send(val)}).catch((err) => {console.error(err)})


                    //To Delete the Projects
                    // projectsModal.findOneAndDelete({_id: req.query.id}, (err, object) => {
                    //     if(err)
                    //     {
                    //         res.status(400)
                    //     }
                    //     else{
                    //         res.json(object)
                    //     }
                    // })

                }

            } catch (err) {
                res.status(400)
                console.error(err)
            }
        })

/*
End of Project Section
 */



/*
Post Section All GET and POST related 
to post component will be Handled Here
 */

API.route('/posts')
        .get( (req, res) => {

            PostsAPI.getPost(postsModal).then((val) => {res.send(val)}).catch((err) => {console.error(err)})
            
        })
        .post( (req, res) => {
            try {
                if(req.body != null)
                {
                    // //To add the post
                    const post = new postsModal({
                        title : req.body.title,
                        content : req.body.content,
                        by : req.body.username,
                        time : req.body.time
                    })

                    PostsAPI.insertPost(post).then((val) => {res.send(val)}).catch((err) => {console.error(err)})

                    // To Delete the Post
                    // postsModal.findOneAndDelete({_id: req.query.id}, (err, object) => {
                    //     if(err)
                    //     {
                    //         res.status(400)
                    //     }
                    //     else{
                    //         res.json(object)
                    //     }
                    // })

                }

            } catch (err) {
                res.status(400)
                console.error(err)
            }
        })

/*
End of Post Section
 */



/*
Art Section All GET and POST related 
to Art Gallery component will be Handled Here
 */

API.route('/art')
        .get( (req, res) => {

            ArtAPI.getArt(artModal).then((val) => {res.send(val)}).catch((err) => {console.error(err)})
            
        })
        .post( (req, res) => {
            try {
                if(req.body != null)
                {
                    //To add the art
                    const art = new artModal({
                        image : req.body.image,
                        time : req.body.time
                    })

                    ArtAPI.insertArt(art).then((val) => {res.send(val)}).catch((err) => {console.error(err)})

                    // To Delete the Art
                    // artModal.findOneAndDelete({_id: req.query.id}, (err, object) => {
                    //     if(err)
                    //     {
                    //         res.status(400)
                    //     }
                    //     else{
                    //         res.json(object)
                    //     }
                    // })

                }

            } catch (err) {
                res.status(400)
                console.error(err)
            }
        })

/*
End of Art Section
 */


module.exports = API