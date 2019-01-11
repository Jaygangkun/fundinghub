<?php

require_once ('config.php');

function createCard($acesstoken, $pipe_id, $phase_id, $data){
    $url = 'https://app.pipefy.com/queries';

    $curlSession = curl_init();

    curl_setopt($curlSession, CURLOPT_URL, $url);

    //change format of birthday from mm/dd/yyyy to dd/mm/yyyy
    $birthdates = explode('/', $_POST['birthday']);
    $birthdate = $birthdates[1]."/".$birthdates[0]."/".$birthdates[2];
    
    $referral_partner_email = $data['referral_partner_email'];

    $need_referral_info = $data['need_referral_info'];
    if($need_referral_info == 0){
        $referral_partner_email = '';
    }
    
    $data_string = '
        mutation{
            createCard(
                input: {
                    pipe_id: '.$pipe_id.'
                    fields_attributes: [
                        {field_id: "what", field_value:"'.$data['what'].'"}
                        {field_id: "last_name", field_value: "'.$data['last_name'].'"}
                        {field_id: "loan_amount_requested", field_value: "'.$data['loan_amount_requested'].'"}
                        {field_id: "how_much_debt_do_you_have", field_value: "'.$data['how_much_debt_do_you_have'].'"}
                        {field_id: "purpose_of_the_loan", field_value: "'.$data['purpose_of_the_loan'].'"}
                        {field_id: "phone_number", field_value: "'.$data['phone_number'].'"}
                        {field_id: "email_address", field_value: "'.$data['email_address'].'"}
                        {field_id: "birthday", field_value: "'.$birthdate.'"}
                        {field_id: "mothers_maiden_name", field_value: "'.$data['mothers_maiden_name'].'"}
                        {field_id: "social_security_number", field_value: "'.$data['social_security_number'].'"}
                        {field_id: "estimated_credit", field_value: "'.$data['estimated_credit'].'"}
                        {field_id: "street_address", field_value: "'.$data['street_address'].'"}
                        {field_id: "unit_number", field_value: "'.$data['unit_number'].'"}
                        {field_id: "city", field_value: "'.$data['city'].'"}
                        {field_id: "state_of_current_address", field_value: "'.$data['state_of_current_address'].'"}
                        {field_id: "zip_code", field_value: "'.$data['zip_code'].'"}
                        {field_id: "years_at_current_address", field_value: "'.$data['years_at_current_address'].'"}
                        {field_id: "housing_status", field_value: "'.$data['housing_status'].'"}
                        {field_id: "monthly_housing_payment", field_value: "'.$data['monthly_housing_payment'].'"}
                        {field_id: "individual_annual_income", field_value: "'.$data['individual_annual_income'].'"}
                        {field_id: "employment_status", field_value: "'.$data['employment_status'].'"}
                        {field_id: "occupation", field_value: "'.$data['occupation'].'"}
                        {field_id: "employers_name", field_value: "'.$data['employers_name'].'"}
                        {field_id: "employers_phone_number", field_value: "'.$data['employers_phone_number'].'"}
                        {field_id: "employers_address", field_value: "'.$data['employers_address'].'"}
                        {field_id: "employers_city", field_value: "'.$data['employers_city'].'"}
                        {field_id: "employers_state", field_value: "'.$data['employers_state'].'"}
                        {field_id: "employers_zip_code", field_value: "'.$data['employers_zip_code'].'"}
                        {field_id: "years_at_current_job", field_value: "'.$data['years_at_current_job'].'"}
                        {field_id: "referral_partner_email", field_value: "'.$referral_partner_email.'"}
                        {field_id: "partner_everflow_transaction_id", field_value: "'.$data['transaction_id'].'"}
                    ]
                    parent_ids: ["'.$phase_id.'"]
                }
            ) {
                card {
                    id
                    title
                }
            }
        }
    ';

    // echo $data_string;return;
    $data_string = array(
        "query" => $data_string
    );

    curl_setopt($curlSession, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curlSession, CURLOPT_POSTFIELDS, json_encode($data_string));
    curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($curlSession, CURLOPT_POST, 1);


    curl_setopt($curlSession, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Authorization: Bearer '.$acesstoken
    ));

    //curl_setopt($curlSession, CURLOPT_USERPWD, $pipefy_access_token);

    $opt_data = curl_exec($curlSession);
    curl_close($curlSession);

    // $opt_data = json_decode($opt_data, true);

    echo $opt_data;
}

createCard($pipefy_access_token, $pipefy_pipe_id, $pipefy_pipe_phase_id, $_POST);
?>