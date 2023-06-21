import { Model, Sequelize, DataTypes } from 'sequelize'
import { ProductAttributes } from '../attributes/productAttributes'

class Product extends Model implements ProductAttributes {
    public ProdID!: string
    public ProdName!: string
    public Base_Cost!: string

    static initModel(sequelize: Sequelize): void {
        Product.init(
            {
                ProdID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                ProdName: {
                    type: DataTypes.STRING,
                },
                Base_Cost: {
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize,
                tableName: 'Product',
                timestamps: false,
            }
        )
    }
}

export default Product
