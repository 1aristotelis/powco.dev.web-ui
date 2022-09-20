import { Model, DataTypes } from 'sequelize'

import events from '../events'

import { getChannel } from 'rabbi'

export class Message extends Model {
    id: number;
    content: string;
    tx_id: string;

    /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here

    /* models.Answer.belongsTo(models.Question, {
      foreignKey: "question_tx_id",
      targetKey: "tx_id",
      as: "question"
    })

    models.Answer.hasMany(models.BoostpowJob, {
      foreignKey: "content",
      sourceKey: "tx_id",
      as: "boostpow_jobs"
    })

    models.Answer.hasMany(models.BoostpowProof, {
      foreignKey: "content_tx_id",
      sourceKey: "tx_id",
      as: "boostpow_proofs"
    }) */

  }
}

export function init(sequelize) {

    Message.init({
        tx_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        hooks: {
            async afterCreate(message:any) {
                events.emit('bitchat.message.created', message)

                const channel = await getChannel()

                const json = JSON.stringify(message.toJSON())

                channel.publish('bitchat', 'bitchat.message.created', Buffer.from(json))
            }
        },
        sequelize,
        createdAt: false,
        updatedAt:false,
        modelName: 'Message',
        tableName: 'messages'
    })

    return Message
}