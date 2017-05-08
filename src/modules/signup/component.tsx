import React from 'react';

class SignUp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.threeStepForm();
  }

  public threeStepForm() {
    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;

    $(".next").click(function(){
    	if(animating) return false;
    	animating = true;

    	current_fs = $(this).parent();
    	next_fs = $(this).parent().next();

    	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    	next_fs.show();

    	current_fs.animate({opacity: 0}, {
    		step: function(now, mx) {
    			scale = 1 - (1 - now) * 0.2;
    			left = (now * 50)+"%";
    			opacity = 1 - now;
    			current_fs.css({
            'transform': 'scale('+scale+')',
            'position': 'absolute'
          });
    			next_fs.css({'left': left, 'opacity': opacity});
    		},
    		duration: 800,
    		complete: function(){
    			current_fs.hide();
    			animating = false;
    		},
    		easing: 'easeInOutBack'
    	});
    });

    $(".previous").click(function(){
    	if(animating) return false;
    	animating = true;

    	current_fs = $(this).parent();
    	previous_fs = $(this).parent().prev();

    	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    	previous_fs.show();
    	current_fs.animate({opacity: 0}, {
    		step: function(now, mx) {
    			scale = 0.8 + (1 - now) * 0.2;
    			left = ((1-now) * 50)+"%";
    			opacity = 1 - now;
    			current_fs.css({'left': left});
    			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
    		},
    		duration: 800,
    		complete: function(){
    			current_fs.hide();
    			animating = false;
    		},
    		easing: 'easeInOutBack'
    	});
    });

    $(".submit").click(function(){
    	return false;
    })
  }

  public render() {
    console.log(this.props);

    return (
      <div>
        <form id="msform">
          <ul id="progressbar">
            <li className="active">Account Setup</li>
            <li>Social Profiles</li>
            <li>Personal Details</li>
          </ul>

          <fieldset>
            <h2 className="fs-title">Create your account</h2>
            <h3 className="fs-subtitle">This is step 1</h3>
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="pass" placeholder="Password" />
            <input type="password" name="cpass" placeholder="Confirm Password" />
            <input type="button" name="next" className="next action-button" value="Next" />
          </fieldset>
          <fieldset>
            <h2 className="fs-title">Social Profiles</h2>
            <h3 className="fs-subtitle">Your presence on the social network</h3>
            <input type="text" name="twitter" placeholder="Twitter" />
            <input type="text" name="facebook" placeholder="Facebook" />
            <input type="text" name="gplus" placeholder="Google Plus" />
            <input type="button" name="previous" className="previous action-button" value="Previous" />
            <input type="button" name="next" className="next action-button" value="Next" />
          </fieldset>
          <fieldset>
            <h2 className="fs-title">Personal Details</h2>
            <h3 className="fs-subtitle">We will never sell it</h3>
            <input type="text" name="fname" placeholder="First Name" />
            <input type="text" name="lname" placeholder="Last Name" />
            <input type="text" name="phone" placeholder="Phone" />
            <textarea name="address" placeholder="Address"></textarea>
            <input type="button" name="previous" className="previous action-button" value="Previous" />
            <input type="submit" name="submit" className="submit action-button" value="Submit" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SignUp;
