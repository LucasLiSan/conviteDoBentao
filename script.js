document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.querySelector('button');
    const envelope = document.querySelector('.envelope');
    let flipped = false;

    function pullOut() {
        return gsap.timeline()
            .to('.flap', {
                duration: 1,
                rotationX: 180,
                ease: "power1.inOut"
            }, 'scaleBack')
            .to('.invitation', {
                duration: 1,
                scale: 0.8,
                ease: "power4.inOut",
            }, 'scaleBack')
            .set('.flap', {
                zIndex: 0
            })
            .to('.card', {
                duration: 1,
                y: '0%',
                scaleY: 1.2,
                ease: "circ.inOut",
            })
            .set('.mask', {
                overflow: 'visible',
                onComplete: function() {
                    envelope.classList.toggle('is-open');
                }
            })
            .to('.mask', {
                duration: 1.3,
                clipPath: 'inset(0 0 0% 0)',
                ease: "circ.inOut",
            }, 'moveDown')
            .to('.card', {
                duration: 1.3,
                y: '100%',
                scaleY: 1,
                ease: "circ.inOut",
            }, 'moveDown')
            .to('button', {
                duration: 1,
                y: '180px',
                ease: "circ.inOut",
                onComplete: toggleText
            }, 'moveDown+=0.15');
    }

    function toggleFlip() {
        if (!envelope.classList.contains('is-open')) {
            return;
        }

        const ry = (!flipped) ? 180 : 0;
        flipped = (!flipped) ? true : false;

        gsap.to('.card', {
            duration: 1,
            rotationY: ry,
            ease: "power4.inOut",
            onComplete: toggleText
        });
    }

    function toggleText() {
        const text = !flipped ? 'Onde vai ser?' : 'Te vejo lá!';
        button.classList.toggle('invert', !flipped);
        button.textContent = text;
    }

    button.addEventListener('click', function() {
        if (!button.classList.contains('clicked')) {
            button.classList.add('clicked');
            pullOut();
        } else {
            toggleFlip();
        }
    });
});
