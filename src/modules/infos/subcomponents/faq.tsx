import React from 'react';

class FAQ extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="container">
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <div className="panel panel-default">
            <div className="panel-heading collapsed pointer-cursor" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <h4 className="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  FAQ
                </a>
              </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
              <div className="panel-body">
                <h4>"My Account is Frozen/ I can't Sign In anymore"</h4>
                <p>Please drop us a line at swapnowio[at]gmail.com, and we will take care of it!</p>
                <h4>"I'd like to delete my account"</h4>
                <p>Please drop us a line at swapnowio[at]gmail.com, and we will take care of it!</p>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading collapsed pointer-cursor" role="tab" id="headingTwo" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <h4 className="panel-title">
                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Prohibited Items
                </a>
              </h4>
            </div>
            <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
              <div className="panel-body">
                <ul>
                  <li>Adult Only category</li>
                  <li>Alcohol</li>
                  <li>Animals and wildlife products – examples include live animals, mounted specimens, and ivory</li>
                  <li>Art</li>
                  <li>rtifacts, grave-related items, and Native American arts and crafts</li>
                  <li>Catalytic converters and test pipes</li>
                  <li>Cell phone (wireless) service contracts</li>
                  <li>Charity and fundraising</li>
                  <li>Clothing, used</li>
                  <li>Contracts</li>
                  <li>Cosmetics</li>
                  <li>Counterfeit currency and stamps</li>
                  <li>Coupons</li>
                  <li>Credit cards</li>
                  <li>Currency, selling</li>
                  <li>Drugs and drug paraphernalia</li>
                  <li>Electronics equipment – examples include cable TV de-scramblers, radar scanners, and traffic signal control devices</li>
                  <li>Electronic surveillance equipment – examples include wiretapping devices and telephone bugging devices</li>
                  <li>Embargoed goods and prohibited countries – examples include items from Cuba</li>
                  <li>Event tickets</li>
                  <li>Firearms, weapons, and knives – examples include pepper spray, replicas, and stun guns (see also military items)</li>
                  <li>Food and healthcare items</li>
                  <li>Gift cards</li>
                  <li>Government documents, IDs, and licenses</li>
                  <li>Government, transit, and shipping-related items – examples include airplane operations manuals, subway employee uniforms, and U.S. Postal Service (USPS) mailbags</li>
                  <li>Hazardous, restricted, or regulated materials – examples include batteries, fireworks, and refrigerants</li>
                  <li>Human remains and body parts</li>
                  <li>Importation of goods into the US – examples include CDs intended only for distribution in a certain country</li>
                  <li>International trading</li>
                  <li>Items encouraging illegal activity – examples include an eBook describing how to create methamphetamine</li>
                  <li>Lockpicking devices</li>
                  <li>Lottery tickets</li>
                  <li>Mailing lists and personal information</li>
                  <li>Medical drugs, devices, and healthcare – examples include prescription drugs, contact lenses, pacemakers, and surgical instruments</li>
                  <li>Military items (see also firearms, weapons, and knives)</li>
                  <li>Multi-level marketing, pyramid, and matrix programs</li>
                  <li>Offensive material – examples include ethnically or racially offensive material and Nazi memorabilia</li>
                  <li>Pesticides</li>
                  <li>Plants and seeds</li>
                  <li>Police-related items</li>
                  <li>Political memorabilia (reproduction)</li>
                  <li>Postage meters</li>
                  <li>Prescription drugs</li>
                  <li>Prohibited services</li>
                  <li>Real estate</li>
                  <li>Recalled items</li>
                  <li>Slot machines</li>
                  <li>Stamps</li>
                  <li>Stocks and other securities</li>
                  <li>Stolen property</li>
                  <li>Surveillance equipment</li>
                  <li>Tobacco</li>
                  <li>Travel</li>
                  <li>Weeds (see plants and seeds)</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading collapsed pointer-cursor" role="tab" id="headingThree"  data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <h4 className="panel-title">
                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Terms of Use
                </a>
              </h4>
            </div>
            <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
              <div className="panel-body">
                <p>
                  <strong>WELCOME TO</strong> Swap. We hope you find it useful. By accessing our servers, websites, or content therefrom (together, "SW"), you agree to these Terms of Use ("TOU"), last updated May 18, 2017.
                </p>
                <p>
                  <strong>LICENSE.</strong> If you are 18 or older, we grant you a limited, revocable, nonexclusive, nonassignable, nonsublicensable license to access SW in compliance with the TOU; unlicensed access is unauthorized. You agree not to license, distribute, make derivative works, display, sell, or "frame" content from SW, excluding content you create and sharing with friends/family. You grant us a perpetual, irrevocable, unlimited, worldwide, fully paid/sublicensable license to use, copy, perform, display, distribute, and make derivative works from content you post.
                </p>
                <p>
                  <strong>USE.</strong> You agree not to use or provide software (except for general purpose web browsers and email clients, or software expressly licensed by us) or services that interact or interoperate with SW, e.g. for downloading, uploading, posting, flagging, emailing, search, or mobile use. Robots, spiders, scripts, scrapers, crawlers, etc. are prohibited, as are misleading, unsolicited, unlawful, and/or spam postings/email. You agree not to collect users' personal and/or contact information ("PI").
                </p>
                <p>
                  <strong>MODERATION.</strong> You agree we may moderate SW access and use in our sole discretion, e.g. by blocking (e.g. IP addresses), filtering, deletion, delay, omission, verification, and/or access/account/license termination. You agree (1) not to bypass said moderation, (2) we are not liable for moderating, not moderating, or representations as to moderating, and (3) nothing we say or do waives our right to moderate, or not. All site rules, e.g. cl.com/about/prohibited, are incorporated herein.
                </p>
                <p>
                  <strong>DISCLAIMER.</strong> MANY JURISDICTIONS HAVE LAWS PROTECTING CONSUMERS AND OTHER CONTRACT PARTIES, LIMITING THEIR ABILITY TO WAIVE CERTAIN RIGHTS AND RESPONSIBILITIES. WE RESPECT SUCH LAWS; NOTHING HEREIN SHALL WAIVE RIGHTS OR RESPONSIBILITIES THAT CANNOT BE WAIVED.
                </p>
                <p>
                  To the extent permitted by law, (1) we make no promise as to SW, its completeness, accuracy, availability, timeliness, propriety, security or reliability; (2) your access and use are at your own risk, and SW is provided "AS IS" and "AS AVAILABLE"; (3) we are not liable for any harm resulting from (a) user content; (b) user conduct, e.g. illegal conduct; (c) your SW use; or (d) our representations; (4) WE AND OUR OFFICERS, DIRECTORS, EMPLOYEES ("SW ENTITIES"), DISSNAIM ALL WARRANTIES & CONDITIONS, EXPRESS OR IMPLIED, OF MERCHANTABILITY, FITNESS FOR PARTICULAR PURPOSE, OR NON-INFRINGEMENT; (5) SW ENTITIES ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS (E.G. OF PROFIT, REVENUE, DATA, OR GOODWILL).
                </p>
                <p>
                  <strong>CLAIMS</strong>. You agree (1) any claim, cause of action or dispute ("Claim") arising out of or related to the TOU or your SW use is governed by California ("CA") law regardless of your location or any conflict or choice of law principle; (2) Claims must be resolved exclusively by state or federal court in San Francisco, CA (except we may seek injunctive remedy anywhere); (3) to submit to personal jurisdiction of said courts; (4) any Claim must be filed by 1 year after it arose or be forever barred; (5) not to bring or take part in a class action against SW Entities; (6) (except government agencies) to indemnify SW Entities for any damage, loss, and expense (e.g. legal fees) arising from claims related to your SW use; (7) you are liable for TOU breaches by affiliates (e.g. marketers) paid by you, directly or indirectly (e.g. through an affiliate network); and (8) to pay us for breaching or inducing others to breach the "USE" section, not as a penalty, but as a reasonable estimate of our damages (actual damages are often hard to calculate): $0.10 per server request, $1 per post, email, flag, or account created, $1 per item of PI collected, and $1000 per software distribution, capped at $25,000 per day.
                </p>
                <p>
                  <strong>MISC.</strong> Users complying with prior written licenses may access SW thereby until authorization is terminated. Otherwise, this is the exclusive and entire agreement between us. If a TOU term is unenforceable, other terms are unaffected. If TOU translations conflict with the English version, English controls. See Privacy Policy for how we collect, use and share data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { FAQ };
