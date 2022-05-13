
var prompts = [
	{
		prompt: 'I felt engaged at work',
		weight: 1,
		class: 'group0'
	},
	{
		prompt: 'I felt comfortable after my meals',
		weight: 1,
		class: 'group1'
	},
	{
		prompt: 'I slept for 7 hours last night',
		weight: 1,
		class: 'group2'
	},
	{
		prompt: 'I felt relax when I am resting',
		weight: 1,
		class: 'group3'
	},
	{
		prompt: 'I had a healthy diet',
		weight: 1,
		class: 'group4'
	},
{
	prompt: 'I avoided eating too much suger',
	weight: 1,
	class: 'group5'
},
{
	prompt: 'I avoided eating too much fat',
	weight: 1,
	class: 'group6'
},
{
	prompt: 'I enjoyed learning new things',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'I had three meals',
	weight: 1,
	class: 'group8'
},
{
	prompt: 'I felt motivated at everything',
	weight: 1,
	class: 'group9'
},
{
	prompt: 'I felt confident about myself',
	weight: 1,
	class: 'group10'
},
{
	prompt: 'I enjoyed my day',
	weight: 1,
	class: 'group11'
}

]

var prompt_values = [
{
	value: 'Very True', 
	class: 'btn-default btn-strongly-agree',
	weight: 2,
	img:"https://i.postimg.cc/2y7xtLjj/2022-05-13-074949.png",
	content:"<b>Your are a legend!!!</b> <br><br>\
	You are very healthy on this question,\n\
	<br><br>\
    please maintain this\
	<br><br>\
	and enjoy your healthy lifestyle. "
},
{
	value: 'True',
	class: 'btn-default btn-agree',
	weight: 1,
	img:"https://i.postimg.cc/1XmM9d6p/2022-05-13-065611.png",
	content:"<b>Good Joob!</b> <br><br>\
	You are healthy on this question,\n\
	<br><br>\
    try to maintain this\
	<br><br>\
	or maybe even push yourself to your boundary tomorrow. "
}, 
{
	value: 'Neutral', 
	class: 'btn-default',
	weight: 0,
	img:"https://i.postimg.cc/wMXNBCnw/2022-05-13-074816.png",
	content:"<b>Emm...</b> <br><br>\
	You are neither healthy or unhealthy on this question,\n\
	<br><br>\
    how about make a change about this\
	<br><br>\
	and start to have a healthy life tomorrow. "
},
{
	value: 'Wrong',
	class: 'btn-default btn-disagree',
	weight: -1,
	img:"https://i.postimg.cc/NMWh0mBs/2022-05-13-070625.png",
	content:"<b>Come on!</b> <br><br>\
	You are not so healthy on this question,\n\
	<br><br>\
    try to relex and rest well\
	<br><br>\
	and take better care of yourself tomorrow. "
},
{ 
	value: 'Very Wrong',
	class: 'btn-default btn-strongly-disagree',
	weight: -2,
	img:"https://i.postimg.cc/JzxX8hxd/2022-05-13-065953.png",
	content:"<b>Oh No!!!</b> <br><br>\
	You are very unhealthy on this question,\n\
	<br><br>\
    please change this tomorrow\n\
	<br><br>\
	your health is the most vital thing! "
}
]

var mask = document.querySelector("#mask")
var img = document.querySelector("#img")
var content = document.querySelector('#content')
var answerList = JSON.parse(localStorage.getItem('answer')) || Array(prompts.length).fill(null)
console.log(answerList)

function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}

function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.setAttribute('data-index',i);
			button.setAttribute('data-qustion-index',li_index);
			// console.log('11',answerList[li_index])
			if (answerList[li_index] && answerList[li_index] == i) {
				button.className = 'group' + li_index + ' value-btn active btn ' + prompt_values[i].class;
			} else {
				button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			}
			
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();

var total = 0;

function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}

$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	var classArr = classList.split(" ");
	var this_group = classArr[0];
	var index = $(this).attr('data-index');
	var qestionIndex = $(this).attr('data-qustion-index');
	console.log(classList)
	
	
	if($(this).hasClass('active')) {
		answerList[qestionIndex] = null;
		localStorage.setItem('answer',JSON.stringify(answerList))
		$(this).removeClass('active');
	} else {
		answerList[qestionIndex] = index;
		localStorage.setItem('answer',JSON.stringify(answerList))
		$('.'+this_group).removeClass('active');
		$(this).addClass('active');
	}
	//set mask content
	img.src = prompt_values[index].img
	content.innerHTML = prompt_values[index].content
	mask.style.display = 'flex'
})

$("#mask").click(function(){
	this.style.display = 'none'
})

$('#submit-btn').click(function () {
	var answer = $('.value-btn.active');
	$('.results').removeClass('hide');
	$('.results').addClass('show');
	
	for(let i = 0; i < answer.length;i++)
	{
		var classList = $(answer[i]).attr('class');
		var classArr = classList.split(" ");
		var this_group = classArr[0];
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(answer[i]).text()));
	}
	
	console.log('total',total)
	
	if(total < 6 || total === 6) {
		document.getElementById('results').innerHTML = `
			<img src="https://i.postimg.cc/xjmKj1Nj/fdd0969981f34ca3396014818aa77c24.jpg" class="results col-md-4 col-sm-4 col-xs-4">
			<div>
				<b>You need to take better care of yourself!</b><br><br>\
						Your score shows that you did not manage to have a healthy lfestyle today.\n\
				<br><br>\
				Please take better care of your yourself!\n\
				<br><br>\
				Life can sometimes be hard.<br><br>\
				But your health is the most important thing in your life.\n\n\
				<br><br>\
			</div>
		`
	} else if(total > 12 || total === 12 ) {
		document.getElementById('results').innerHTML =  `
			<img src="https://i.postimg.cc/6p25ryrF/2022-05-13-101041.png" class="results col-md-4 col-sm-4 col-xs-4">
			<div>
				<b>You have a healthy day!</b><br><br>\
				Congratulations! You score shows that you have a healthy day,<br><br>\
				 please live like this for you rest of life!
			</div>
		`
	}

	

	else if(total < 12 || total > 6) {
		document.getElementById('results').innerHTML = `
			<img src="https://i.postimg.cc/GtG63nG7/223a6d6c0ee46df83141d169db272497.jpg" class="results col-md-4 col-sm-4 col-xs-4">
			<div>
				<b>Your score shows that you did OK today,</b><br><br>\
				but try to live healthier tomorrow.<br><br>\
			  A healthy lifestyle will make your life so much better.<br><br>\
			  Give it a try, and you'll understand what I mean!
		</div>
		`
	}

	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})