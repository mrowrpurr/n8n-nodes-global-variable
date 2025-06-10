import { Icon, ICredentialType, INodeProperties } from "n8n-workflow"

export const GLOBAL_VARIABLES_INFO = {
	credentialsName: "globalVariablesApi",
}

// eslint-disable-next-line n8n-nodes-base/cred-class-name-unsuffixed
export class GlobalVariablesCredentials implements ICredentialType {
	name = GLOBAL_VARIABLES_INFO.credentialsName
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-display-name-missing-api
	displayName = "Global Variable"
	description = "Global Variable defined as JSON"
	icon: Icon = "fa:file-code"

	properties: INodeProperties[] = [
		{
			type: "notice",
			displayName: "To access variables in your workflows, use the Global Variable node",
			name: "notice",
			default: "",
		},
		{
			displayName: "Define your variables in JSON below",
			name: "variables",
			type: "json",
			default: "{}",
			description: "Define your Global Variable as a JSON object",
			placeholder: '{\n  "myVariable": "value",\n  "count": 42,\n  "config": {\n    "enabled": true\n  }\n}',
		},
	]
}

export interface GlobalVariablesCredentialsData {
	variables: string
}
