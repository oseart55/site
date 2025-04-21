$.ajax({
    url: 'https://x.com/i/api/graphql/VgitpdpNZ-RUIp5D1Z_D-A/UserTweets',
    crossDomain: true,
    headers: {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
      'priority': 'u=1, i',
      'referer': 'https://x.com/MattPetagara',
      'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'x-client-transaction-id': 'Gumx3jGkUXDxkn7FtXsiTI46EfrNekCyNOItREPqyNVQHv07GpTIkEL7n4NWQcGhyXMLrRnGayxM3jXqiWXi3lUm26xKGQ',
      'x-client-uuid': '3a35de59-5162-404c-ad9d-db1ce818bf6e',
      'x-csrf-token': '33e65606950a2c251fa0c0b9989553751253d242ddd200aa9285e8eec247c3e8c0f563a49c7164bf6fc4c0e99240fd39e08e12e80cd1a61ff75c7b42d9a6b1a66bbf5fd9203bd34ade45364ccc5320a1',
      'x-twitter-active-user': 'yes',
      'x-twitter-auth-type': 'OAuth2Session',
      'x-twitter-client-language': 'en',
      'cookie': 'night_mode=2; kdt=i7BO5gqjxrqfkwLdMrvlaqL0ny6woxbi1MaZU4nk; dnt=1; personalization_id="v1_LQSa1+bXA1YO0sdANkaPdQ=="; auth_multi="1657812652301733889:c4b652309f4fdf53f42e470faa0a5b9f9fb8e284"; auth_token=de8c474a4e607e5cae12fc8227affd424842a7a7; guest_id_ads=v1%3A173310360423501181; guest_id_marketing=v1%3A173310360423501181; guest_id=v1%3A173310360423501181; twid=u%3D2906513160; ct0=33e65606950a2c251fa0c0b9989553751253d242ddd200aa9285e8eec247c3e8c0f563a49c7164bf6fc4c0e99240fd39e08e12e80cd1a61ff75c7b42d9a6b1a66bbf5fd9203bd34ade45364ccc5320a1; intercom-device-id-jgtierkz=5a94ebb3-e385-4224-8638-f7636696bdc0; lang=en; ph_phc_TXdpocbGVeZVm5VJmAsHTMrCofBQu3e0kN8HGMNGTVW_posthog=%7B%22distinct_id%22%3A%220196592a-723a-7458-84be-898dbc0504c3%22%2C%22%24sesid%22%3A%5B1745252677694%2C%220196592a-7239-76c1-89de-9f1ae1adc976%22%2C1745252676153%5D%7D; __cf_bm=lwFHtlryAGivHxK.jrvZoq6uJY2NmpGPo0lIDKukX8I-1745253587-1.0.1.1-P1Vz4v0_09Lcistzm3KjF.vtZsAvJw_xYdm81d681H2M3FJckksr.pdIS_lnOsYBQmIfQSnOH68i52fRaLE5M8eSIXiv0ux1UduLtEnvFD0'
    },
    data: {
      'variables': '{"userId":"2906513160","count":100,"includePromotedContent":false,"withQuickPromoteEligibilityTweetFields":false,"withVoice":true,"withV2Timeline":true}'  }
  }).done(function(response) {
    console.log(response);
  });