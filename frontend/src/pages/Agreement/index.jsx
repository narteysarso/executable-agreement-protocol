import { useState } from 'react';
import { Layout, Button, message, Steps, Popover, Form, Row, Col, Divider } from 'antd';
import { useMemo } from 'react';
import AgreementDataForm from './AgreementDataForm';
import AgreementClauseForm from './AgreementClauseForm';
import AgreementDeliverableForm from './Deliverable';
import { useAgreement } from '../../context/agreementForm';
import useAgreementContract from '../../hooks/useAgreementContract';
import AgreementTokenizationForm from './AgreementTokenizationForm';

const { Step } = Steps;

const customDot = (dot, { status, index }) => (
	<Popover
		content={
			<span>
				step {index} status: {status}
			</span>
		}
	>
		{dot}
	</Popover>
);

export default function Agreement() {
	const [current, setCurrent] = useState(0);
	const { 
		infoDataFields,
		clauseDataFields,
		deliverableDataFields,
		tokenDataFields,
		validatorsDataFields, 
		setInfoDataFields, 
		setClauseDataFields, 
		setDeliverableDataFields, 
		setValidatorsDataFields ,
		setTokenDataFields
	} = useAgreement();

	const {createAgreement} = useAgreementContract();

	const steps = [
		{
			title: 'Information',
			content: useMemo(() => <AgreementDataForm />),
		},
		{
			title: 'Tokenization',
			content: useMemo(() => <AgreementTokenizationForm />),
		},
		{
			title: 'Clauses',
			content: useMemo(() => <AgreementClauseForm />),
		},
		{
			title: 'Deliverable/Expectation',
			content: useMemo(() => <AgreementDeliverableForm targetToken={0x0}/>),
		},
	];

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const handleFormUpdate = (formName, { changedFields, forms }) => {
		if (formName === "agreement-data-form") {
			setInfoDataFields(forms[formName].getFieldsValue())
			return;
		}
		if (formName === "dynamic_clauses") {
			setClauseDataFields(forms[formName].getFieldsValue());
			return;
		}

		if (formName === "dynamic_deliverables") {
			setDeliverableDataFields(forms[formName].getFieldsValue());
			return;
		}

		if (formName.includes("dynamic_validators")) {
			setValidatorsDataFields({...validatorsDataFields, ...forms[formName].getFieldsValue()})
			return;
		}
		if (formName.includes("agreement-tokenization-form")) {
			setTokenDataFields(forms[formName].getFieldsValue())
			return;
		}
	}

	const handleDone = () => {
		createAgreement({
			infoData: infoDataFields, 
			clauseData: clauseDataFields, 
			deliverableData: deliverableDataFields,
			validatorsData: validatorsDataFields,
			tokenizationData: tokenDataFields
		});
		message.success('Processing complete!')
	}

	return (

		<Layout className="site-layout-background" style={{ padding: '5vw 4vh', minHeight: "85vh" }}>
			<Layout.Content style={{ textAlign: "center" }}>
				<Row>
					<Col flex={1}>

						<Form.Provider onFormChange={handleFormUpdate}>
							<Steps progressDot={customDot} current={current}>
								{steps.map(item => (
									<Step key={item.title} title={item.title} />
								))}
							</Steps>

							<div className="steps-content">{steps[current].content}</div>

							<div className="steps-action">
								{current > 0 && (
									<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
										Previous
									</Button>
								)}
								{current < steps.length - 1 && (
									<Button type="primary" onClick={() => next()}>
										Next
									</Button>
								)}
								{current === steps.length - 1 && (
									<Button type="primary" onClick={handleDone}>
										Done
									</Button>
								)}
							</div>

						</Form.Provider>
					</Col>
					<Divider type="vertical" orientation='center' >Preview</Divider>
					<Col flex={1.5}>

					</Col>
				</Row>

			</Layout.Content>

		</Layout>

	)
}

