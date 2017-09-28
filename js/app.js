start_game();
var moves = 0;
var opened = [];
var timer = 0;
stars = document.getElementsByClassName('fa-star');
setInterval(function(){
	timer++;
	$('.time').text(timer);
},1000);

//initializes the game
function start_game() {
    var symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond']
    cards = shuffle(symbols);
    var deck = document.getElementsByClassName('deck')[0];
    for (var index = 0; index < 16; index++) {
        deck.innerHTML += '<li class="card"><i class="fa fa-' + cards[index] + '"></i></li>';
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//jQuery function for card click
$('.card').click(function() {
	if(!($(this).hasClass('open') || $(this).hasClass('match'))){
		moves++;
	    $('.moves').text(moves);
		check_stars();
		$(this).addClass('open');
	    opened.push($(this));
	    if (opened.length % 2 == 0) {
	        setTimeout(card_match, 1000);
	    }
	}
});

//this function matches cards.
function card_match() {
    if (opened[opened.length - 2].html() == opened[opened.length - 1].html()) {
        opened[opened.length - 2].removeClass('open');
        opened[opened.length - 2].addClass('match');
        opened[opened.length - 1].removeClass('open');
        opened[opened.length - 1].addClass('match');
    } else {
        opened[opened.length - 1].removeClass('open');
        opened[opened.length - 2].removeClass('open');
        opened.pop();
        opened.pop();
    }
    if (opened.length == 16) {
		stars = document.getElementsByClassName('fa-star').length;
		swal({
			allowEscapeKey: false,
			allowOutsideClick: false,
			title: 'Congratulations! You Won!',
			text: 'With ' + moves + ' Moves and ' + stars + ' Stars and took ' + timer + 'sec to finish.',
			type: 'success',
			confirmButtonColor: '#02ccba',
			confirmButtonText: 'Play again!'
		}).then(function(isConfirm) {
			if (isConfirm) {
				window.location.reload();
			}
		})
    }
}

//this function gives star ratings.
function check_stars(){
	if(moves==23){
		stars[2].classList.add('fa-star-o');
		stars[2].classList.remove('fa-star');
	}
	else if(moves==31){
		stars[1].classList.add('fa-star-o');
		stars[1].classList.remove('fa-star');
	}
}
