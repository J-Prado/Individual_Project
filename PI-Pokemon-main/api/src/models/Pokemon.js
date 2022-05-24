const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("pokemon", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Can not be null",
        },
        isAlpha: {
          args: true,
          msg: "Name only allows letters",
        },
        len: {
          args: [2, 25],
          msg: "Must be between 2-25 chars",
        },
      },
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Can not be null",
        },
        isInt: {
          args: true,
          msg: "Health should be a number",
        },
      },
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Can not be null",
        },
        isInt: {
          args: true,
          msg: "Must be a number",
        },
      },
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Can not be null",
        },
        isInt: {
          args: true,
          msg: "Must be a number",
        },
      },
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Can not be null",
        },
        isInt: {
          args: true,
          msg: "Must be a number",
        },
      },
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Can not be null",
        },
        isInt: {
          args: true,
          msg: "Must be a number",
        },
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Can not be null",
        },
        isInt: {
          args: true,
          msg: "Must be a number",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        notNull: {
          msg: "Can not be null",
        },
      },
      defaultValue:
        "https://i5.walmartimages.com/asr/08d3e234-2836-4c58-a11b-f8da7f9ec12c_1.dbe5da88bcc66eb92919ec68321f296c.jpeg",
    },
    createdDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
