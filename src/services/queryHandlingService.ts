import QueryHandling from '../database/models/queryHandling'

class QueryHandlingService {
    private static instance: QueryHandlingService

    static getInstance(): QueryHandlingService {
        if (!QueryHandlingService.instance) {
            QueryHandlingService.instance = new QueryHandlingService()
        }
        return QueryHandlingService.instance
    }

    findAll = async () => {
        const query: QueryHandling[] = await QueryHandling.findAll()
        return query
    }

    findById = async (id: string) => {
        const existingQuery: QueryHandling | null =
            await QueryHandling.findByPk(id)
        return existingQuery
    }

    save = async (object: any) => {
        // eslint-disable-next-line no-useless-catch
        try {
            if (!object && Object.keys(object.length == 0)) {
                throw new Error('Object must contain atleast one property')
            }
            const queryHandling = await QueryHandling.create({ ...object })

            return queryHandling
        } catch (err) {
            throw err
        }
    }

    update = async (QID: string, object: any) => {
        if (!object && Object.keys(object).length == 0) {
            throw new Error(
                'Object to be updated must contain at least one property.'
            )
        }

        let existingQuery = await this.findById(QID)
        if (!existingQuery) {
            throw new Error('query_not_found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await QueryHandling.update(
                { ...object },
                {
                    where: { QID },
                }
            )

            existingQuery = await this.findById(QID)
            return existingQuery
        } catch (err) {
            throw err
        }
    }

    deleteByPrimaryKey = async (id: string) => {
        let existingQuery = await this.findById(id)
        if (!existingQuery) {
            throw new Error('query_not_found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await existingQuery.destroy()
        } catch (err) {
            throw err
        }
    }
}

export default QueryHandlingService
