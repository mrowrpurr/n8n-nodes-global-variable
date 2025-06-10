import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionType, NodeOperationError } from "n8n-workflow"
import { GLOBAL_VARIABLE_INFO, GlobalVariableCredentialsData } from "../../credentials/GlobalVariableCredentials.credentials"

export class GlobalVariable implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Global Variable",
		name: "globalVariable",
		icon: "fa:file-code",
		group: ["transform", "output"],
		version: 1,
		description: "Access Global Variable from JSON configuration",
		subtitle: '={{$parameter["putAllInOneKey"] ? "$" + $parameter["variablesKeyName"] : ""}}',
		defaults: {
			name: "Global Variable",
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: GLOBAL_VARIABLE_INFO.credentialsName,
				required: true,
			},
		],
		properties: [
			{
				displayName: "Put All Variables in One Key",
				name: "putAllInOneKey",
				type: "boolean",
				default: true,
				description: "Whether to put all variables in one key or use separate keys for each variable",
			},
			{
				displayName: "Variables Key Name",
				name: "variablesKeyName",
				type: "string",
				default: "vars",
				displayOptions: {
					show: {
						putAllInOneKey: [true],
					},
				},
			},
		],
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = (await this.getCredentials(GLOBAL_VARIABLE_INFO.credentialsName)) as unknown as GlobalVariableCredentialsData

		let variables: Record<string, any> = {}

		try {
			// Parse the JSON variables from the credential
			variables = JSON.parse(credentials.variables || "{}")
		} catch (error) {
			throw new NodeOperationError(this.getNode(), `Invalid JSON in variables field: ${error}`)
		}

		// Validate that variables is an object
		if (typeof variables !== "object" || variables === null || Array.isArray(variables)) {
			throw new NodeOperationError(this.getNode(), "Variables must be defined as a JSON object")
		}

		const putAllInOneKey = this.getNodeParameter("putAllInOneKey", 0) as boolean

		let variablesData: Record<string, any> = {}

		if (putAllInOneKey) {
			const variablesKeyName = this.getNodeParameter("variablesKeyName", 0) as string
			variablesData = {
				[variablesKeyName]: variables,
			}
		} else {
			variablesData = variables
		}

		// For each input, add the variables data
		const returnData = this.getInputData()
		if (returnData.length === 0) {
			// Create a new item with the variables data
			returnData.push({ json: variablesData })
		} else {
			// Add the variables data to each item
			returnData.forEach((item: INodeExecutionData) => {
				item.json = {
					...item.json,
					...variablesData,
				}
			})
		}

		return [returnData]
	}
}
