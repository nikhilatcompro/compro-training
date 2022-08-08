const { Stack } = require('aws-cdk-lib');
const user_service = require('./user_service');

class UserDisplayAppStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
      new user_service.UserService(this, 'Users');
  }
}

module.exports = { UserDisplayAppStack }
