const {User} = require('../../models');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send({
          status: "success",
          data: {
            users
          }
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "failed",
            message: "no data found"
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