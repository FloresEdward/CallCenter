import SequelizeConnection from '../configuration'
// import Department from './department'
import Employee from './employee'
import Product from './product'
import QueryHandling from './queryHandling'

const sequelize = SequelizeConnection.getInstance()

//Inititalize Models
// Department.initModel(sequelize)
Employee.initModel(sequelize)
Product.initModel(sequelize)
QueryHandling.initModel(sequelize)

export const db = {
    sequelize,
    // Department,
    Employee,
    Product,
    QueryHandling,
}
