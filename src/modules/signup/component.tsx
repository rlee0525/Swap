import React from 'react';

class SignUp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.threeStepForm();

    window.fbAsyncInit = function() {
      FB.init({
        appId: '1843174039341965',
        cookie: true,
        xfbml: true,
        version: 'v2.1'
      });

      FB.getLoginStatus(function(response) {
        console.log(response);
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    ((d, s, id) => {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.setAttribute('src', "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1843174039341965");
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  public testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    });
  }

  public statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    }
  }

  public checkLoginState() {
    FB.getLoginStatus(function(response) {
      console.log(response)
      this.statusChangeCallback(response);
    }.bind(this));
  }

  public handleClick() {
    FB.login(this.checkLoginState());
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

  public clickNext() {

  }

  public render() {
    console.log(this.props);

    return (
      <div className="signup-form-container">
        <form id="msform">
          <ul id="progressbar">
            <li className="active">Account Setup</li>
            <li>Social Profiles</li>
            <li>Personal Details</li>
          </ul>

          <fieldset>
            <h2 className="fs-title">Create your account</h2>
            <div id="status"></div>
            <div
              className="fb-login-button"
              data-max-rows="1"
              data-size="large"
              data-button-type="continue_with"
              data-show-faces="true"
               data-auto-logout-link="true"
               data-use-continue-as="true"
             />
            <input type="button" name="next" className="next action-button" value="Next" onClick={this.clickNext} />
          </fieldset>
          <fieldset>
            <h2 className="fs-title">Link to your university email</h2>
            <input type="text" name="uni_email" placeholder="University Email" />
            <input type="button" name="previous" className="previous action-button" value="Previous" />
            <input type="button" name="next" className="next action-button" value="Next" />
          </fieldset>
          <fieldset>
            <h2 className="fs-title">Email Verification</h2>
            <h3 className="fs-subtitle">Thank you for verifying your email!</h3>
            <input type="button" name="previous" className="previous action-button" value="Previous" />
            <input type="submit" name="submit" className="submit action-button" value="Submit" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SignUp;
