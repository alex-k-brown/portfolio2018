// Today's date
const today = new Date();

// Header Template
const headerTemplate = ({name, title, email}) => `
	<div class="name">${name}</div>
	<div class="title">${title}</div>
	<div id="social" class="social"></div>
`;

// Populate Social
function populateSocial(social) {
	social.forEach(function(account, n) {
		$('#social').append(`
			<a href="${account}" target="_blank" class="social-account social-account-${n}"></a
		`);
	});
}

// Profile Template
const profileTemplate = ({title, location}) => `
	<div class="title">${title}</div>
	<div class="text">
		<div class="location">Location: ${location}</div>
		<div id="years" class="years"></div>
		<div id="intro-copy" class="copy"></div.
	</div>
	<div class="photo"></div>
`

//Populate Intro Copy
function populateIntroCopy(copy) {
	copy.forEach(function(paragraph, n) {
		$('#intro-copy').append(`
			<div class="paragraph">${paragraph}<div>
		`);
	});
}

// Set experience
const experience = (start) => `Experience: ${today.getFullYear() - start} years`;

// Add HTML
function populateHtml({header, profile}) {

	// Add header
	$('#header').append(headerTemplate(header));

	// Add Social
	populateSocial(header.social);

	// Add profile
	$('#profile').append(profileTemplate(profile));

	// Add Intro Copy
	populateIntroCopy(profile.copy);

	// Add years of experience
	$('#years').append(experience(profile.start));
}

// App to run
function on() {
	populateHtml(data);
}

on();