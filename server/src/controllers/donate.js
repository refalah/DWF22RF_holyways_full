const {Donate, User, Fund} = require('../../models');

exports.createDonate = async (req, res) => {
    const {userId, fundId, donateAmount, status, proofAttachment} = req.body;
    try {
      const user = await User.findOne({where: {id: userId}});
      const fund = await User.findOne({where: {id: fundId}});

      const proofAttachment = req.files.imageFile[0].filename;
      const donate = await Donate.create({userId: user.id, fundId: fund.id, donateAmount, status, proofAttachment });
        
        return res.json(donate);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "something went wrong"
        })
    }
}

exports.getDonate = async (req, res) => {

    try {
    //    const donate = await Donate.findAll({include: User});
       //const donate = await Donate.findAll({include: {User, Fund}});

    //    return res.json(donate);

    const donations = await Donate.findAll({
        include: [
          {
            model: User,
            // as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"]
            }
          },
          
          {
            model: Fund,
            //as: "donations",
            // through: {
            //   model: Donate,
            //   //as: "conjuction",
            //   //attributes: []
            // },
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }
      ],

        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });

      res.send({
        status: "success",
        data: {
          donations
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

