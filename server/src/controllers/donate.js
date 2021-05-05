const {Donate, User, Fund} = require('../../models');

exports.createDonate = async (req, res) => {
    const {userId, fundId, donateAmount, status, proofAttachment} = req.body;
    try {
      const id = req.userId;
      const id2 = req.params.id2;
      console.log(id2)
      
      const proofAttachment = req.files.imageFile[0].filename;
      const donate = await Donate.create({userId: id, fundId: id2, donateAmount, status, proofAttachment });
        
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

    let donos = await Donate.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"]
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

      donos = JSON.parse(JSON.stringify(donos));
      donos = donos.map((dono) => {
        return {
          ...dono,
          image_url: process.env.PATH_KEY + dono.proofAttachment
        };
      });
      
      console.log(donos)

      res.send({
        status: "success",
        data: {
          donos
        }
    });


    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

