// Copy for the Privacy Policy, Terms of Use and Data protection / Imprint pages.

// A run of text, optionally led by a bold label ("Legal basis: …").
export type LegalText = string | { label: string; text: string };

export type LegalBlock =
  | { type: "p"; text: LegalText }
  | { type: "list"; items: LegalText[] }
  | { type: "address"; lines: string[] }
  | { type: "h3"; text: string }
  | { type: "contact" };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

const p = (text: string, label?: string): LegalBlock => ({
  type: "p",
  text: label ? { label, text } : text,
});
const list = (...items: LegalText[]): LegalBlock => ({ type: "list", items });
const labelled = (label: string, text: string): LegalText => ({ label, text });
const h3 = (text: string): LegalBlock => ({ type: "h3", text });
const contact: LegalBlock = { type: "contact" };

const COMPANY: LegalBlock = {
  type: "address",
  lines: [
    "Swinging Lama Productions uG (limited liability)",
    "Ludwig-Wucherer-Str. 34",
    "06108 Halle (Saale)",
  ],
};

const REPRESENTATIVES = "Sebastian Büttner, Michael Geidel";

const LEGAL_BASIS_ART_9 =
  "Art. 9 para. 1 sentence 1 lit. b GDPR (application procedure as a pre-contractual or contractual relationship) (Insofar as special categories of personal data within the meaning of Art. 9 para. 1 GDPR (e.g. health data, such as severe disability or ethnic origin) are requested from applicants during the application procedure so that the controller or the data subject can exercise their rights and fulfill their obligations under employment law and social security and social protection law, their processing is carried out in accordance with Art. 9 para. 2 lit. b GDPR, in the case of the protection of the vital interests of the applicants or other persons pursuant to Art. 9 para. 2 lit. c GDPR, or for purposes of preventive or occupational medicine, for the assessment of the employee's fitness for work, for medical diagnosis, the provision of health or social care or treatment, or for the management of health or social care systems and services pursuant to Art. 9 para. 2 lit. h GDPR. In the case of the disclosure of special categories of data based on voluntary consent, their processing is carried out on the basis of Art. 9 para. 2 lit. a GDPR.)";

export const PRIVACY_UPDATED = "As of September 13, 2019";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "responsible",
    title: "Responsible",
    blocks: [COMPANY, p(REPRESENTATIVES, "Authorized representatives"), contact],
  },
  {
    id: "overview",
    title: "Overview of processing activities",
    blocks: [
      p(
        "The following overview summarizes the types of data processed and the purposes of their processing, and refers to the data subjects.",
      ),
      h3("Types of data processed"),
      list(
        "Inventory data (e.g. names, addresses).",
        "Applicant data (e.g. personal details, postal and contact addresses, application documents and the information contained therein, such as cover letters, CVs, certificates and other information relating to a specific position or voluntarily provided by applicants regarding their person or qualifications).",
        "Content data (e.g., text entries, photographs, videos).",
        "Contact details (e.g. email, phone numbers).",
        "Metadata/communication data (e.g., device information, IP addresses).",
        "Usage data (e.g. websites visited, interest in content, access times).",
      ),
      h3("Categories of affected persons"),
      list(
        "Applicants.",
        "Interested parties.",
        "Communication partner.",
        "Users (e.g., website visitors, users of online services).",
      ),
      h3("Purposes of processing"),
      list(
        "Provision of our online services and user-friendliness.",
        "Application process (justification and any subsequent implementation as well as possible subsequent termination of the employment relationship).",
        "Direct marketing (e.g. via email or post).",
        "Contact requests and communication.",
        "Managing and responding to inquiries.",
      ),
    ],
  },
  {
    id: "legal-bases",
    title: "Relevant legal bases",
    blocks: [
      p(
        "Below, we explain the legal bases under the General Data Protection Regulation (GDPR) on which we process personal data. Please note that in addition to the GDPR regulations, national data protection laws may apply in your or our country of residence or establishment.",
      ),
      list(
        labelled(
          "Consent (Art. 6 para. 1 sentence 1 lit. a GDPR)",
          "The data subject has given consent to the processing of his or her personal data for one or more specific purposes.",
        ),
        labelled(
          "Contractual performance and pre-contractual inquiries (Art. 6 para. 1 sentence 1 lit. b. GDPR)",
          "The processing is necessary for the performance of a contract to which the data subject is a party or in order to take steps at the request of the data subject prior to entering into a contract.",
        ),
        labelled(
          "Legitimate interests (Art. 6 para. 1 sentence 1 lit. f. GDPR)",
          "Processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require protection of personal data.",
        ),
        "Article 9(1)(b) GDPR (application process as a pre-contractual or contractual relationship) (Insofar as special categories of personal data within the meaning of Article 9(1) GDPR (e.g., health data, such as severe disability or ethnic origin) are requested from applicants during the application process so that the controller or the data subject can exercise their rights and fulfill their obligations under employment law and social security and social protection law, their processing is carried out in accordance with Article 9(2)(b) GDPR, in the case of the protection of the vital interests of the applicants or other persons in accordance with Article 9(2)(c) GDPR, or for the purposes of preventive or occupational medicine, for the assessment of the employee's fitness for work, for medical diagnosis, the provision of health or social care or treatment, or for the management of health or social care systems and services in accordance with Article 9(2)(h) GDPR. In the case of the disclosure of special categories of data based on voluntary consent, their processing is carried out on the basis of Art. 9 para. 2 lit. a. GDPR.)",
      ),
    ],
  },
  {
    id: "security",
    title: "Security measures",
    blocks: [
      p(
        "In accordance with legal requirements, taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing as well as the varying likelihood and severity of the threat to the rights and freedoms of natural persons, we implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.",
      ),
      p(
        "These measures include, in particular, ensuring the confidentiality, integrity, and availability of data by controlling physical and electronic access to the data, as well as access to, input of, transfer of, and ensuring the availability and separation of the data. Furthermore, we have established procedures that guarantee the exercise of data subject rights, the deletion of data, and responses to data breaches. We also consider the protection of personal data during the development and selection of hardware, software, and processes, in accordance with the principles of data protection by design and by default.",
      ),
    ],
  },
  {
    id: "contact",
    title: "Contact",
    blocks: [
      p(
        "When you contact us (e.g. via contact form, email, telephone or social media), the information provided by the requesting persons will be processed to the extent necessary to answer the contact requests and any requested measures.",
      ),
      p(
        "Responding to contact requests within the framework of contractual or pre-contractual relationships is done to fulfill our contractual obligations or to answer (pre-)contractual inquiries, and otherwise on the basis of our legitimate interests in answering the inquiries.",
      ),
      p(
        "For communication purposes and to answer inquiries, we offer a chat function within our online service. User input within the chat is processed for the purpose of answering their inquiries.",
        "Chat function",
      ),
      list(
        labelled(
          "Types of data processed",
          "Inventory data (e.g. names, addresses), contact data (e.g. email, telephone numbers), content data (e.g. text entries, photographs, videos), usage data (e.g. websites visited, interest in content, access times), meta/communication data (e.g. device information, IP addresses).",
        ),
        labelled("Affected persons", "Communication partners, interested parties."),
        labelled(
          "Purposes of processing",
          "Contact requests and communication, administration and answering of inquiries.",
        ),
        labelled(
          "Legal basis",
          "Contract performance and pre-contractual inquiries (Art. 6 para. 1 sentence 1 lit. b. GDPR), Legitimate interests (Art. 6 para. 1 sentence 1 lit. f. GDPR).",
        ),
      ),
    ],
  },
  {
    id: "chatbots",
    title: "Chatbots",
    blocks: [
      p(
        "We offer a chatbot as a means of communication. A chatbot is software that answers user questions or informs them via messages. When you interact with our chatbot, we may process your personal data.",
      ),
      p(
        "If you communicate with the chatbot within an online platform, your ID within that platform will also be stored (e.g., your Facebook ID in the case of Facebook Messenger). We may also collect information about which users interact with our chatbot and when. Furthermore, we store the content of your conversations with the chatbot and log registration and consent processes in order to be able to provide proof of compliance with legal requirements.",
      ),
      p(
        "Please note that the respective platform provider may be able to determine whether and when users communicate with our chatbot, as well as collect technical information about the user's device and, depending on their device settings, location information (so-called metadata) for the purposes of optimizing the respective services and for security purposes. Furthermore, the metadata of communication via chatbot (i.e., information about who communicated with whom) may be used by the respective platform providers for marketing purposes or to display personalized advertising, in accordance with their terms and conditions, which we refer you to for further information.",
      ),
      p(
        "If users agree to receive regular messages from the chatbot, they can unsubscribe at any time. The chatbot will guide users through the process of unsubscribing and the necessary terms. Unsubscribing from chatbot messages will delete the user's data from the message recipient list.",
      ),
      p(
        "We use the aforementioned information to operate our chatbot, e.g., to address users personally, to answer their inquiries to the chatbot, to transmit any requested content, and also to improve our chatbot (e.g., to \"teach\" it answers to frequently asked questions or to identify unanswered inquiries).",
      ),
      p(
        "We use the chatbot based on consent, meaning we have previously obtained permission from users to allow the chatbot to process their data (this applies to cases where users are asked for their consent, e.g., so that the chatbot can send them regular messages). If we use the chatbot to answer user inquiries about our services or our company, this is done for contractual and pre-contractual communication purposes. Furthermore, we use the chatbot based on our legitimate interests in optimizing the chatbot, its operational efficiency, and improving the user experience.",
        "Legal basis",
      ),
      p(
        "You can revoke your consent at any time or object to the processing of your data in connection with our use of our chatbot.",
        "Revocation, objection and deletion",
      ),
      list(
        labelled(
          "Types of data processed",
          "Contact data (e.g. email, telephone numbers), content data (e.g. text entries, photographs, videos), usage data (e.g. websites visited, interest in content, access times), meta/communication data (e.g. device information, IP addresses).",
        ),
        labelled("Affected persons", "Communication partners."),
        labelled(
          "Purposes of processing",
          "Contact requests and communication, direct marketing (e.g. by email or post).",
        ),
        labelled(
          "Legal basis",
          "Consent (Art. 6 para. 1 sentence 1 lit. a GDPR), Legitimate interests (Art. 6 para. 1 sentence 1 lit. f GDPR).",
        ),
      ),
    ],
  },
  {
    id: "hosting",
    title: "Provision of the online service and web hosting",
    blocks: [
      p(
        "To ensure the secure and efficient provision of our online services, we utilize the services of one or more web hosting providers, from whose servers (or servers they manage) the online services can be accessed. For these purposes, we may utilize infrastructure and platform services, computing capacity, storage space and database services, as well as security and technical maintenance services.",
      ),
      p(
        "The data processed in connection with providing our hosting services may include all information relating to users of our online services that is generated during use and communication. This regularly includes the IP address, which is necessary to deliver the content of online services to browsers, and all entries made within our online services or on websites.",
      ),
      p(
        "The web hosting services we use also include sending, receiving, and storing emails. For these purposes, the addresses of the recipients and senders, as well as other information relating to email transmission (e.g., the providers involved) and the content of the respective emails, are processed. The aforementioned data may also be processed for spam detection purposes. Please note that emails are generally not encrypted when sent over the internet. While emails are usually encrypted during transmission, they are not encrypted on the servers from which they are sent and received (unless end-to-end encryption is used). Therefore, we cannot assume any responsibility for the security of emails during transmission between the sender and their arrival on our server.",
        "Email sending and hosting",
      ),
      p(
        "We (or our web hosting provider) collect data on every access to the server (so-called server log files). Server log files may include the address and name of the accessed web pages and files, the date and time of access, the amount of data transferred, notification of successful access, browser type and version, the user's operating system, referrer URL (the previously visited page), and, typically, IP addresses and the requesting provider.",
        "Collection of access data and log files",
      ),
      p(
        "Server log files can be used for security purposes, e.g., to avoid overloading the servers (especially in the case of malicious attacks, so-called DDoS attacks), and to ensure server utilization and stability.",
      ),
      list(
        labelled(
          "Types of data processed",
          "Content data (e.g. text entries, photographs, videos), usage data (e.g. websites visited, interest in content, access times), meta/communication data (e.g. device information, IP addresses).",
        ),
        labelled("Affected persons", "Users (e.g., website visitors, users of online services)."),
        labelled("Legal basis", "Legitimate interests (Art. 6 para. 1 sentence 1 lit. f. GDPR)."),
      ),
    ],
  },
  {
    id: "application",
    title: "Application process",
    blocks: [
      p(
        "The application process requires applicants to provide us with the data necessary for their assessment and selection. The required information is specified in the job description or, in the case of online forms, in the information provided there.",
      ),
      p(
        "Generally, the required information includes personal details such as name, address, contact information, and proof of qualifications necessary for the position. We will gladly provide further details upon request.",
      ),
      p(
        "If available, applicants can submit their applications to us using an online form. The data is transmitted to us using state-of-the-art encryption.",
      ),
      list(
        labelled(
          "Types of data processed",
          "Applicant data (e.g. personal details, postal and contact addresses, application documents and the information contained therein, such as cover letters, CVs, certificates and other information relating to a specific position or voluntarily provided by applicants regarding their person or qualifications).",
        ),
        labelled("Affected persons", "Applicants."),
        labelled(
          "Purposes of processing",
          "Application process (establishment and any subsequent implementation as well as possible subsequent termination of the employment relationship).",
        ),
        labelled("Legal basis", LEGAL_BASIS_ART_9),
      ),
    ],
  },
  {
    id: "plugins",
    title: "Plugins and embedded functions as well as content",
    blocks: [
      p(
        "We integrate functional and content elements into our online services that are obtained from the servers of their respective providers (hereinafter referred to as \"third-party providers\"). These may include, for example, graphics, videos, social media buttons, and posts (hereinafter collectively referred to as \"content\").",
      ),
      p(
        "The integration of third-party content always requires that these providers process users' IP addresses, as they cannot send the content to users' browsers without them. The IP address is therefore necessary for displaying this content or these functions. We strive to use only content from providers who use IP addresses solely for content delivery. Third-party providers may also use so-called pixel tags (invisible graphics, also known as \"web beacons\") for statistical or marketing purposes. These pixel tags allow for the analysis of information such as visitor traffic on the pages of this website. The pseudonymized information can also be stored in cookies on users' devices and may include, among other things, technical information about the browser and operating system, referring websites, the time of visit, and other information about the use of our online services, as well as be combined with such information from other sources.",
      ),
      p(
        "If we ask users for their consent to the use of third-party providers, the legal basis for processing data is that consent. Otherwise, user data is processed based on our legitimate interests (i.e., our interest in providing efficient, economical, and user-friendly services). In this context, we would also like to draw your attention to the information on the use of cookies in this privacy policy.",
        "Information on the legal basis",
      ),
      list(
        labelled(
          "Types of data processed",
          "Usage data (e.g. websites visited, interest in content, access times), meta/communication data (e.g. device information, IP addresses).",
        ),
        labelled("Affected persons", "Users (e.g., website visitors, users of online services)."),
        labelled(
          "Purposes of processing",
          "Provision of our online service and user-friendliness.",
        ),
      ),
    ],
  },
  {
    id: "deletion",
    title: "Deletion of data",
    blocks: [
      p(
        "The data we process will be deleted in accordance with legal requirements as soon as the consents allowing its processing are revoked or other permissions cease to apply (e.g., if the purpose of processing this data no longer exists or it is no longer necessary for that purpose).",
      ),
      p(
        "Unless the data is deleted because it is required for other legally permissible purposes, its processing will be restricted to those purposes. This means the data will be blocked and not processed for any other purpose. This applies, for example, to data that must be retained for commercial or tax law reasons, or whose storage is necessary for the establishment, exercise, or defense of legal claims, or for the protection of the rights of another natural or legal person.",
      ),
      p(
        "Further information regarding the deletion of personal data can also be found in the individual data protection notices of this privacy policy.",
      ),
    ],
  },
  {
    id: "changes",
    title: "Changes and updates to the privacy policy",
    blocks: [
      p(
        "We ask that you regularly review the content of our privacy policy. We will update the privacy policy as soon as changes to our data processing activities make this necessary. We will inform you if any changes require action on your part (e.g., consent) or any other individual notification.",
      ),
    ],
  },
  {
    id: "rights",
    title: "Rights of data subjects",
    blocks: [
      p(
        "As a data subject, you have various rights under the GDPR, which arise in particular from Articles 15 to 18 and 21 of the GDPR:",
      ),
      list(
        labelled(
          "Right to object",
          "You have the right to object, on grounds relating to your particular situation, at any time to processing of personal data concerning you which is based on point (e) or (f) of Article 6(1) of the GDPR, including profiling based on those provisions. Where personal data concerning you are processed for direct marketing purposes, you have the right to object at any time to processing of personal data concerning you for such marketing, which includes profiling to the extent that it is related to such direct marketing.",
        ),
        labelled(
          "Right of withdrawal for consents",
          "You have the right to withdraw any consent you have given at any time.",
        ),
        labelled(
          "Right to information",
          "You have the right to request confirmation as to whether data concerning you is being processed, and to access this data as well as further information and a copy of the data in accordance with legal requirements.",
        ),
        labelled(
          "Right to rectification",
          "In accordance with legal requirements, you have the right to request the completion of your personal data or the correction of inaccurate personal data concerning you.",
        ),
        labelled(
          "Right to erasure and restriction of processing",
          "In accordance with legal requirements, you have the right to request that data concerning you be erased without undue delay, or alternatively, in accordance with legal requirements, to request a restriction of the processing of the data.",
        ),
        labelled(
          "Right to data portability",
          "You have the right to receive the personal data concerning you that you have provided to us in a structured, commonly used and machine-readable format, or to request its transmission to another controller, in accordance with the legal requirements.",
        ),
        labelled(
          "Right to lodge a complaint with a supervisory authority",
          "You also have the right, in accordance with legal requirements, to lodge a complaint with a supervisory authority, in particular in the Member State of your habitual residence, your place of work or the place of the alleged infringement, if you believe that the processing of personal data relating to you infringes the GDPR.",
        ),
      ),
    ],
  },
  {
    id: "definitions",
    title: "Definitions of terms",
    blocks: [
      p(
        "This section provides an overview of the terms used in this privacy policy. Many of the terms are taken from the law and are defined primarily in Article 4 of the GDPR. The legal definitions are binding. The following explanations, however, are intended primarily to aid understanding. The terms are listed alphabetically.",
      ),
      list(
        labelled(
          "Personal data",
          "“Personal data” means any information relating to an identified or identifiable natural person (hereinafter referred to as “data subject”); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier (e.g. a cookie) or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.",
        ),
        labelled(
          "Controller",
          "The term “controller” refers to the natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data.",
        ),
        labelled(
          "Processing",
          "“Processing” means any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means. The term is broad and encompasses virtually any handling of data, be it collection, analysis, storage, transmission or erasure.",
        ),
      ),
    ],
  },
];

export const PRIVACY_CREDIT = "Created with Datenschutz-Generator.de by Dr. jur. Thomas Schwenke";

export const ALEXA_PRIVACY_INTRO: LegalBlock[] = [
  p(
    "This privacy policy describes how we protect your privacy and your data. Before using any of our Alexa Skills, please read this policy and our Alexa Skills Terms of Use, as well as the Alexa Terms of Use and the Privacy Policies by the Amazon Digital Services LLC (with its affiliates, “Amazon”).",
  ),
  p(
    "Regarding Amazon, “Alexa” means their Alexa Voice Service which includes third party services (like our skills) and other related Software.",
  ),
  p("If you use one of our skills you fully agree to this privacy policy."),
];

export const ALEXA_PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "general",
    title: "General",
    blocks: [
      p(
        "When you use our skills you have to talk to Alexa. This voice input is sent to Amazon and us where we use it to understand what our skill should do for you. This is absolutely necessary for our service to give you an appropriate answer.",
      ),
    ],
  },
  {
    id: "data",
    title: "Data",
    blocks: [
      p("We never collect or share personal data with our skills."),
      p(
        "To improve our services we analyze automatically how often utterances are spoken and other analytics. This is done automatically by Amazon in the Amazon Developer Portal.",
      ),
    ],
  },
  {
    id: "changes",
    title: "Changes",
    blocks: [
      p(
        "Our skills or parts of it may change or be updated at any time. Further, this Privacy Policy might change. You can find a link to this policy on the description page of the skill in the Alexa App or in the Alexa Store. Your continued use of our skill after changes of the Privacy Policy or the skill itself will be seen as your acceptance of both.",
      ),
    ],
  },
];

export const ALEXA_TERMS_SECTIONS: LegalSection[] = [
  {
    id: "general",
    title: "General",
    blocks: [
      p(
        "This Terms of Use are an agreement between you and Swinging Lama Productions. Before using any of our Alexa Skills, please read this agreement and our Alexa Skills Privacy Policy as well as the Alexa Terms of Use by the Amazon Digital Services LLC (with its affiliates, “Amazon”).",
      ),
      p(
        "Regarding Amazon, “Alexa” means their Alexa Voice Service which includes third party services (like our skills) and other related Software.",
      ),
      p("If you use one of our skills you fully agree to this Terms of Use."),
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    blocks: [
      p(
        "Our skills or parts of it may discontinue at any time or might contain errors. You use our skills on your own responsibility. Any information should not be seen as an advice.",
      ),
    ],
  },
  {
    id: "changes",
    title: "Changes",
    blocks: [
      p(
        "Our skills or parts of it may change or be updated at any time. Further, our Terms of Use might change. You can find a link to this agreement on the description page of the skill in the Alexa App or in the Alexa Store. Your continued use of our skill after changes of the Terms of Use or the skill itself will be seen as your acceptance of both.",
      ),
    ],
  },
  {
    id: "for-you",
    title: "For You",
    blocks: [
      p(
        "We love developing Alexa Skills for you. And we love to make things better by developing digital products and services.",
      ),
    ],
  },
];

export const IMPRINT_SECTIONS: LegalSection[] = [
  {
    id: "information",
    title: "Information according to § 5 TMG",
    blocks: [
      COMPANY,
      h3("Authorized Managing Director"),
      p(REPRESENTATIVES),
      h3("Contact"),
      contact,
      h3("Register entry"),
      p("Halle (Saale) District Court"),
      p("HRB 732541"),
      h3("VAT ID No."),
      p("DE 326818122"),
      h3("Responsible for content"),
      p(REPRESENTATIVES),
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    blocks: [
      h3("Liability for content"),
      p(
        "As a service provider, we are responsible for our own content on these pages in accordance with Section 7 Paragraph 1 of the German Telemedia Act (TMG). However, according to Sections 8 to 10 of the TMG, we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. However, liability in this respect is only possible from the point at which we become aware of a specific legal infringement. Upon becoming aware of such legal infringements, we will remove this content immediately.",
      ),
      h3("Liability for links"),
      p(
        "Our website contains links to external websites of third parties, over whose content we have no control. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time the links were created. Illegal content was not identified at the time the links were created. However, continuous monitoring of the content of linked pages is not reasonable without concrete evidence of a legal violation. Upon notification of legal violations, we will remove such links immediately.",
      ),
      h3("Copyright"),
      p(
        "The content and works created by the website operators on these pages are subject to German copyright law. Reproduction, processing, distribution, and any form of exploitation beyond the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this page are permitted only for private, non-commercial use. Insofar as the content on this page was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon notification of legal violations, we will remove such content immediately.",
      ),
    ],
  },
];
