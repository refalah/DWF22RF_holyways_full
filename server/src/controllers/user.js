const {User, Donate, Fund} = require('../../models');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send({
          status: "success",
          data: {
            users
          }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "no data found"
        })
    }
}

exports.profile = async (req, res) => {
    const id = req.userId
    try {
        let users = await User.findOne({where: {id},
          include: [
            {
              model: Donate,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            },
            
            {
              model: Fund,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            }
          ],
        });

        users = JSON.parse(JSON.stringify(users));
        // users = [users].map((user) => {
        //   return {
        //     ...user,
        //     image_url: process.env.PATH_KEY + user.picture
        //   }
        // })
        console.log(users);
        res.send({
          status: "success",
          data: {
            users
          }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "no data found"
        })
    }
}

exports.editProfile = async (req, res) => {
  const id = req.userId;
  const {fullName, email, picture, phone} = req.body;
  
  try {
      const picture = req.files.imageFile[0].filename;

      const edit = await User.update({fullName, email, picture, phone}, {where: {id}});

      console.log(edit)

      res.send({
          status: "success",
          data: {
            edit
          }
        });

  } catch (error) {
      console.log(error);
      res.send({
          status: "failed",
          message: "something went wrong"
      })
  }
}

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        
        res.status(200).send({
            status: "success",
            data: {
              user: {
                fullName: user.fullName,
                email: user.email
              }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
      const user = await User.findOne({
        where: {
          id
        }
      });

      if (user) {
        await User.destroy({
          where: {
            id
          }
        })

        return res.status(200).send({
          status: "success",
          message: "delete success",
          data: {
            id: 1
          }
        })
      }
      res.status(404).send({
        status: "failed",
        message: "no data found"
    })

    } catch (error) {
      console.log(error);
          res.status(500).send({
              status: "failed",
              message: "server error"
          })
    }
}

exports.socketProfile = async (req, res) => {
  const id = req.userId
  try {
      let users = await User.findOne({where: {id}});

      users = JSON.parse(JSON.stringify(users));
      users = [users].map((user) => {
        return {
          ...user
        }
      })
      console.log(users);
      res.send({
        status: "success",
        data: {
          users
        }
      });
  } catch (error) {
      console.log(error);
      res.send({
          status: "failed",
          message: "no data found"
      })
  }
}