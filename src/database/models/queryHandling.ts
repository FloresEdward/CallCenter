import { Model, Sequelize, DataTypes } from 'sequelize'
import { QueryHandlingAttributes } from '../attributes/queryHandlingAttributes'

class QueryHandling extends Model implements QueryHandlingAttributes {
    public QID!: string
    public Sub_Date!: Date
    public Cust_ID!: string
    public EmpID!: string
    public Res_Date!: Date
    public Status!: string
    public Feedback!: number
    public Query_Text!: string
    public Query_Response!: string

    static initModel(sequelize: Sequelize): void {
        QueryHandling.init(
            {
                QID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                Sub_Date: {
                    type: DataTypes.DATE,
                },
                Cust_ID: {
                    type: DataTypes.STRING,
                },
                EmpID: {
                    type: DataTypes.STRING,
                },
                Res_Date: {
                    type: DataTypes.DATE,
                },
                Status: {
                    type: DataTypes.STRING,
                },
                Feedback: {
                    type: DataTypes.INTEGER,
                },
                Query_Text: {
                    type: DataTypes.STRING,
                },
                Query_Response: {
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize,
                tableName: 'QueryHandling',
                timestamps: false,
                underscored: false,
            }
        )
    }
}

export default QueryHandling
