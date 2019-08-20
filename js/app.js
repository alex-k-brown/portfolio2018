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
			<a href="${account.link}" target="_blank" class="social-account social-account-${n}">
				${account.icon}
			</a
		`);
	});
}

// Profile Template
const profileTemplate = ({title, location, copy}) => `
	<div class="portrait"></div>
	<div class="text">
		<div class="location"><span class="bold">Location</span>: ${location}</div>
		<div id="years" class="years"></div>
		<div id="intro-copy" class="copy">${copy}</div.
	</div>
	<div class="photo"></div>
`;

// Experience Template
const experienceTemplate = ({title}) => `
	<div class="title">${title}</div>
	<div id="jobs" class="jobs"></div>
`;

function vidHover() {
	const section = $(this).attr('data-section');
	const vidNum = $(this).attr('data-value');
	const video = document.getElementById(`video-${section}-${vidNum}`); 
	video.play();
}

function vidLeave() {
	const section = $(this).attr('data-section');
	const vidNum = $(this).attr('data-value');
	const video = document.getElementById(`video-${section}-${vidNum}`); 
	video.pause();
}

// Populate Jobs
function populateJobs(jobs) {
	jobs.forEach(function(job, n) {
		$('#jobs').append(`
			<a href="${job.url}" target="_blank" class="job" data-value="${n}" data-section="job">
				<video id="video-job-${n}" muted playsinline loop>
					<source src="${job.video}" type="video/mp4">
				</video>
				<div class="video-mask">
					<div class="company"></div>
					<div class="position">${job.position}</div>
					<div class="role">${job.role}</div>
				</div>
			</a>
		`)
	});

	$('.job').on('mouseover', vidHover);
	$('.job').on('mouseleave', vidLeave);
}

// Education Template
const educationTemplate = ({title}) => `
	<div class="title">${title}</div>
	<div id="schools" class="schools"></div>
`;

// Populate Schools
function populateSchools(schools) {
	schools.forEach(function(school, n) {
		$('#schools').append(`
			<a href="${school.url}" target="_blank" class="school school-${n}" data-value="${n}" data-section="school">
				<video id="video-school-${n}" muted playsinline loop>
					<source src="${school.video}" type="video/mp4">
				</video>
				<div class="school-image school-image-${n}"></div>
				<div class="school-copy">
					<div class="name">${school.name}</div>
					<div class="location">${school.location}</div>
					<div class="degree">${school.degree}</div>
				</div>
			</a>
		`);
	});

	$('.school').on('mouseover', vidHover);
	$('.school').on('mouseleave', vidLeave);
}

// Portfolio Template
const portfolioTemplate = ({title}) => `
	<div class="title">${title}</div>
	<div id="projects" class="projects"></div>
`;

// Populate Projects
function populateProjects(projects) {
	projects.forEach(function(project, n) {
		$('#projects').append(`
			<a href="${project.url}" target="_blank" class="project project-${n}" data-value="${n}" data-section="project">
				<div class="vid-container">
					<video id="video-project-${n}" muted playsinline loop>
						<source src="${project.video}" type="video/mp4">
					</video>
				</div>
				<div class="title">${project.title}</div>
			</a>
		`);
	});

	$('.project').on('mouseover', vidHover);
	$('.project').on('mouseleave', vidLeave);
}

// Set experience
const experience = (start) => `<span class="bold">Experience</span>: ${today.getFullYear() - start} years`;

// Add HTML
function populateHtml(data) {

	// Add header
	$('#header').append(headerTemplate(data[0]));

	// Add Social
	populateSocial(data[0].social);

	// Add profile
	$('#profile').append(profileTemplate(data[1]));

	// Add years of experience
	$('#years').append(experience(data[1].start));

	//Add Experience Content
	$('#experience').append(experienceTemplate(data[2]));

	// Add Jobs
	populateJobs(data[2].jobs);

	// Add Education Content
	$('#education').append(educationTemplate(data[3]));

	// Add Schools
	populateSchools(data[3].schools);

	// Add Portfolio
	$('#portfolio').append(portfolioTemplate(data[4]));

	// Add projects
	populateProjects(data[4].projects);
}

let bgNum = 19;

// Build background
// function populateBg() {
// 	for(var i = 0; i < bgNum; i++) {
// 		$('#bg').append(`<div id="bg-strip-${i}" class="bg-strip bg-strip-${i}"></div`)
// 	}
// }

let siteHeight;
let screenHeight;
let heightDiff;
let diffRatio;
let scrollStart = 0;
let randomArray = [];
let opacityStart = 1;

// On Scroll

function portfolioScroll() {
	const scrollTop = $(this).scrollTop();
	const scrollChange = scrollTop - scrollStart;
	const opacityChange = opacityStart - (scrollChange/800);
	// opacityStart = opacityChange
	// console.log(scrollChange)
	// scrollStart = scrollTop;
	bgSet(scrollChange);
	// $('#bg').css('opacity', opacityChange);

}

// On Scroll
function screenSet() {
	siteHeight = $('#portfolio-container').height();
	screenHeight = $(window).height();
	heightDiff = siteHeight - screenHeight;
	diffRatio = heightDiff/100;
}

// Set BG

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

function bgSet(topPos) {
	var canvas = document.getElementById('bg');
	var ctx = canvas.getContext('2d');
	// const hover;
	canvas.setAttribute('width', windowWidth);
	canvas.setAttribute('height', windowHeight);
	ctx.translate(0,0);
	// ctx.rotate(angle*Math.PI/180);
	ctx.fillStyle = 'rgba(0,0,0,1)';
	for (var i = 0; i < windowHeight / 10; i++) {
		const rectY = (i * 10);
		for (var j = 0; j < windowWidth / 10; j++) {
			let rectX = (j * 10);
			// console.log(j % 2);
			ctx.fillStyle = `rgba(191,135,15,${(i * 2)/windowWidth}`;
			ctx.fillRect(rectX, rectY, 3, 3);
		}
	}
}

// App to run
function on() {
	// populateBg();
	populateHtml(data);
	bgSet(0);
	$(document).on('scroll', portfolioScroll);
}

on();