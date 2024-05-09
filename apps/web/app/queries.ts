export const HELLO_SAMPLE = `
query exampleQuery {
    hello
}`;

export const CreateUserQuary = `
mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      role
      createdOn
      updatedOn
    }
  }`;

export const CreateModelQuary = `
  mutation CreateModel($input: ModelInput!) {
    createModel(input: $input) {
      id
      name
      label
      prefix
      managed
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }
  `;

export const CreateTabQuary = `
  mutation CreateTab($input: TabInput!) {
    createTab(input: $input) {
      id
      icon
      model {
        id
        name
        label
        prefix
        managed
        createdOn
        updatedOn
      }
      label
      order
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }`;

export const CreateModelFieldQuary = `
  mutation CreateModelField($input: ModelFieldInput!) {
    createModelField(input: $input) {
      id
      model {
        id
      }
      modelName
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      fieldName
      label
      type
      required
      default
      rounds
      unique
      ref
      localField
      foreignField
      enumType
      enumValues
      managed
      fieldOptions {
        id
        model {
          id
        }
        modelName
        modelField {
          id
        }
        fieldName
        keyName
        type
        value
        managed
        prefix
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }`;

export const CreateModelOptionsQuary = `
  mutation CreateModelOption($input: ModelOptionInput!) {
    createModelOption(input: $input) {
      id
      model {
        id
      }
      modelName
      managed
      keyName
      value
      type
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }`;

export const CreateFieldOptionQuary = `
  mutation CreateFieldOption($input: FieldOptionInput!) {
    createFieldOption(input: $input) {
      id
      model {
        id
      }
      modelName
      modelField {
        id
      }
      fieldName
      keyName
      type
      value
      managed
      prefix
      createdOn
      updatedOn
    }
  }`;
export const GetUserQuary = `
  query GetUser($where: whereUserInput!) {
    getUser(where: $where) {
      id
      name
      email
      role
      createdOn
      updatedOn
    }
  }`;

export const GetTabQuary = `
  query GetTab($where: whereTabInput!) {
    getTab(where: $where) {
      id
      icon
      model {
        id
        name
        label
        prefix
      }
      label
      order
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }`;

export const GetFieldOptionQuary = `
  query GetFieldOption($where: whereFieldOptionInput!) {
    getFieldOption(where: $where) {
      id
      model {
        id
        name
      }
      modelName
      modelField {
        id
      }
      fieldName
      keyName
      type
      value
      managed
      prefix
      createdOn
      updatedOn
    }
  }`;

export const getModelOptionQuary = `
  query GetModelOption($where: whereModelOptionInput!) {
    getModelOption(where: $where) {
      id
      model {
        id
        name
      }
      modelName
      managed
      keyName
      value
      type
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }
  `;

export const getlistmodels = `query ListModels($where: whereModelInput) {
    listModels(where: $where) {
      docs {
        createdBy {
          createdOn
          email
          name
          role
        }
        label
        managed
        prefix
        name
        id
        updatedBy {
          id
          name
          email
          role
          createdOn
          updatedOn
        }
      }
      offset
      limit
      totalDocs
    }
  }`;
export const getlistmodeloptions = `
  query ListModelOptions($where: whereModelOptionInput) {
    listModelOptions(where: $where) {
      docs {
        createdBy {
          name
        }
        managed
        model {
          id
          name
        }
        updatedBy {
          name
          id
        }
        value
        id
        keyName
        modelName
        type
      }
    }
  }
  `;
export const getlistmodelfields = `
  query ListModelFields($where: whereModelFieldInput) {
    listModelFields(where: $where) {
      docs {
        createdBy {
          id
          name
          role
        }
        label
        managed
        model {
          id
          name
          label
          prefix
        }
        updatedBy {
          id
          name
          role
        }
      }
      limit
    }
  }
  `;

export const GET_MODEL = `query GetModel($where: whereModelInput!) {
    getModel(where: $where) {
      id
      name
      label
      prefix
      managed
      createdBy {
        id
        name
        email
      }
      updatedBy {
        id
        name
        email
      }
      createdOn
      updatedOn
    }
  }`;

export const UPDATE_MODEL = `mutation UpdateModel($input: updateModelInput!) {
    updateModel(input: $input) {
      id
      name
      label
      prefix
      managed
    }
  }`