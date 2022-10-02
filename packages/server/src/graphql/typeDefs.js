import { gql } from 'apollo-server-express'

// Serve para fazer a junção de todos os TypeDefs.
import { typeDefs as nodeTypeDefs } from './Node/Node'
import { typeDefs as listTypeDefs } from './List/List'
import { typeDefs as clientTypeDefs} from './Client/Client'
import { typeDefs as demandTypeDefs} from './Demand/Demand'

const typeDefs = gql`
  # Necessário criar uma nova query para extender a query do Demand.
  type Query {
    _root: String
  }

  # Concatenação das TypeDefs.
  ${nodeTypeDefs}
  ${listTypeDefs}
  ${clientTypeDefs}
  ${demandTypeDefs}
`

export default typeDefs