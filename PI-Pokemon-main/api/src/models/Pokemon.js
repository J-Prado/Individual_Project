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
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo",
        },
        isAlpha: {
          args: true,
          msg: "El nombre contiene unicamente letras",
        },
        len: {
          args: [3, 25],
          msg: "El nombre debe tener entre 3 y 25 caracteres",
        },
      },
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo",
        },
        isInt: {
          args: true,
          msg: "La salud debe ser un número",
        },
      },
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo",
        },
        isInt: {
          args: true,
          msg: "El ataque debe ser un número",
        },
      },
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo",
        },
        isInt: {
          args: true,
          msg: "La defensa debe ser un número",
        },
      },
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo",
        },
        isInt: {
          args: true,
          msg: "La velocidad debe ser un número",
        },
      },
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo",
        },
        isInt: {
          args: true,
          msg: "La altura debe ser un número",
        },
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo",
        },
        isInt: {
          args: true,
          msg: "El Peso debe ser un número",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Este campo no puede ser nulo",
        },
      },
    },
    createdDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
