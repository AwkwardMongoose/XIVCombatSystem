const limitChecks = document.getElementsByClassName('limit-check');
dragula([document.getElementById('entroot')]);

Array.from(limitChecks).forEach(x => {
    x.addEventListener('change', function() {
        let row = this.id.slice(7);
        let limit1 = document.getElementById('limit1-'+row);
        let limit2 = document.getElementById('limit2-'+row);
        let limit3 = document.getElementById('limit3-'+row);
        let limitNum = this.id.slice(5,6);
        let bar1 = document.getElementById('bar1-'+row);
        let bar2 = document.getElementById('bar2-'+row);
        let bar3 = document.getElementById('bar3-'+row);
        let checked = this.checked;
        switch (limitNum) {
            case '1':
                if (checked == false) {
                    limit2.checked = false;
                    limit3.checked = false;
                    bar1.classList.remove('limit-fill')
                } else {
                    bar1.classList.add('limit-fill')
                }
                bar2.classList.remove('limit-fill')
                bar3.classList.remove('limit-fill')
                break
            case '2':
                if (checked == false) {
                    limit3.checked = false;
                    bar2.classList.remove('limit-fill')
                } else {
                    limit1.checked = true;
                    bar1.classList.add('limit-fill')
                    bar2.classList.add('limit-fill')
                }
                bar3.classList.remove('limit-fill')
                break
            case '3':
                if (checked == false) {
                    bar3.classList.remove('limit-fill')
                } else {
                    limit1.checked = true;
                    limit2.checked = true;
                    bar1.classList.add('limit-fill')
                    bar2.classList.add('limit-fill')
                    bar3.classList.add('limit-fill')
                }
                break
        }
    })
})