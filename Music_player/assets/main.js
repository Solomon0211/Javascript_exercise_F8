    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const PLAYER_STORAGE_KEY = 'SOLOMON_PLAYER'

    const playlist = $('.playlist')
    const playBtn = $('.btn-toggle-play')
    const player = $('.player')
    const cd = $('.cd');
    const heading = $('header h2')
    const cdThumb = $('.cd-thumb')
    const audio = $('#audio')
    const isPlaying = false
    const progress = $('#progress')
    const nextBtn = $('.btn-next')
    const prevBtn = $('.btn-prev')
    const randomBtn = $('.btn-random')
    const repeatBtn = $('.btn-repeat')

    const app = {  
        currentIndex: 0,
        isRandom : false,
        isRepeat : false,
        config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || { },
        setConfig: function(key,value) {
            this.config[key] = value    
            localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
        } ,
        songs: [
        {
            name: 'Venada',
            singer: 'Vicetone',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.jpg'
        },
        {
            name: 'Summertime',
            singer: 'K-391',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.jpg'
        },
        {
            name: 'TheFatRat',
            singer: 'Laura Brehm',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.jpg'
        },
        {
            name: 'Reality',
            singer: 'Lost Frequencies ',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.jpg'
        },
        {
            name: 'Ngày khác lạ',
            singer: 'Đen',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.jpg'
        },
        {
            name: 'Lemon Tree',
            singer: ' DJ DESA REMIX',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.jpg'
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: './assets/music/song7.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: ' My Love',
            singer: 'Westlife ',
            path: './assets/music/song8.mp3',
            image: './assets/img/song8.jpg'
        },
        {
            name: 'Attention',
            singer: 'Charlie Puth',
            path: './assets/music/song9.mp3',
            image: './assets/img/song9.jpg'
        },
        {
            name: 'Monsters',
            singer: 'Katie Sky',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.jpg'
        }],
        render: function() {
            const htmls = this.songs.map((song,index) => {
                return `
                    <div class="song ${index===this.currentIndex ? 'active' : ''}"  data-index="${index}">
                        <div class="thumb" style="background-image: url(${song.image});"></div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>             `
            })
            playlist.innerHTML = htmls.join('');
        },

        defineProperties: function(){ 
            Object.defineProperty(this,'currentSong', {
                get: function() {
                    return this.songs[this.currentIndex];
                }
            })
        },


        handleEvent: function() {
            const _this = this
            const cdWidth = cd.offsetWidth
            

            // Xử lí CD xoay
            const cdThumbAnime = cdThumb.animate([
                {transform : 'rotate(360deg)'}    
            ],{
                duration: 10000, // 10 second
                iterations: Infinity
            })
            cdThumbAnime.pause()
            // Xử lí phóng to thu nhỏ CD
            document.onscroll = function(){
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const cdNewWidth = cdWidth - scrollTop
                cd.style.width = cdNewWidth > 0 ? cdNewWidth + 'px' : 0
                cd.style.opacity = cdNewWidth/scrollTop
           }

           // Xử lí khi play audio
           playBtn.onclick = function() {
                if(_this.isPlaying){
                    audio.pause()
                    cdThumbAnime.pause()
                }else{
                    audio.play()
                    cdThumbAnime.play()
                }
           }

           // khi audio được play
           audio.onplay = function() {
                _this.isPlaying = true
                player.classList.add('playing')
           }
           // when audio is on pausing
           audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing')
           }

           // Khi tiến độ bài hát thay đổi
           audio.ontimeupdate = function() {
                if(audio.duration){

                    const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
                    progress.value = progressPercent
                }
           }

           //tua audio
           progress.oninput = function(e) {  
                const seekTime = Math.floor(audio.duration * e.target.value / 100)
                console.log('moè moè')
                audio.currentTime  = seekTime
            }

            

            //when next song    
            nextBtn.onclick = function() {
                if(_this.isRandom){
                    _this.randomSong()
                }else {
                    _this.nextSong()
                }
                audio.play()
                _this.render()
                _this.scrollIntoActiveSong()
            }

           
            //when previous song
            prevBtn.onclick = function() {
                if(_this.isRandom){
                    _this.randomSong()
                }else{
                    _this.prevSong()
                }
                audio.play()
                _this.render()
                _this.scrollIntoActiveSong()
            }

            // when ramdom click
            randomBtn.onclick = function() {
               // if(_this.isRandom){
                //    _this.isRandom = false
                //    randomBtn.classList.remove('active')
               // }else {
               //     _this.isRandom = true
              //      randomBtn.classList.add('active')
              //  }
                _this.isRandom = !_this.isRandom
                _this.setConfig('isRandom', _this.isRandom)
                randomBtn.classList.toggle('active',_this.isRandom)
                
            }

            // when repeat btn is click
            repeatBtn.onclick = function() {
              //  if(_this.isRepeat) {
              //      _this.isRepeat = false
              //      repeatBtn.classList.remove('active')
              //  }else {
              //      _this.isRepeat = true
              //      repeatBtn.classList.add('active')
              //  }
                _this.isRepeat = !_this.isRepeat
                _this.setConfig('isRepeat', _this.isRepeat)
                repeatBtn.classList.toggle('active', _this.isRepeat)
            }

             // processing next Song when audio ended
             audio.onended = function() {
                if(_this.isRepeat){
                    audio.play()
                }else{
                    nextBtn.click()
                }
                console.log('moè moè')
            }
            // listent when click on playList
            playlist.onclick = function(e) {
                const songNode =e.target.closest('.song:not(.active)')
                const optionNode = e.target.closest('.option')
                //processing when click to song 
                if( songNode || optionNode ) {
                    if(songNode && !optionNode){
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.setConfig('currentIndex', _this.currentIndex)
                        _this.loadCurrentSong()
                        audio.play()
                        _this.render()
                    }

                    // xử lí khi click vào option
                    if(e.target.closest('.option')){
                        console.log('moè moè')
                    }
                }
            }
        },
        scrollIntoActiveSong: function()
        {
            setTimeout(() => {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                })
            }, 500)
        },
        loadCurrentSong: function() {
            heading.textContent = this.currentSong.name
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
            audio.src = this.currentSong.path
        },

            //load Config
        loadConfig:function() {
            this.isRandom = this.config.isRandom
            this.isRepeat = this.config.isRepeat
            this.currentIndex = this.config.currentIndex

            repeatBtn.classList.toggle('active', this.isRepeat)
            randomBtn.classList.toggle('active',this.isRandom)

        } ,
        nextSong: function() {
            this.currentIndex++;
            if(this.currentIndex >= this.songs.length){
                this.currentIndex = 0
            }
            this.setConfig('currentIndex', this.currentIndex)
            this.loadCurrentSong()
        },
            
        prevSong: function() {
            this.currentIndex--
            if(this.currentIndex < 0){
                this.currentIndex = this.songs.length - 1
            }
            this.setConfig('currentIndex', this.currentIndex)
            this.loadCurrentSong()
        },

        randomSong:function(){
            let newIndex
            do{
                newIndex = Math.floor(Math.random()*this.songs.length)

            }while(newIndex === this.currentIndex) 
            this.currentIndex = newIndex

            this.loadCurrentSong()
        },
     
        
        start: function() {
            //load config
            this.loadConfig()
            //Định nghĩa các  thuộc tính cho Object
            this.defineProperties()


            //Định nghĩa các sự kiện
            this.handleEvent();

            //tải bài đầu tiên khi mới chạy
            this.loadCurrentSong();

            // render play list 
            this.render();
            // hiển thị trạng thái ban đầu của botton repeat và random
          //  randomBtn.classList.toggle('active',this.isRandom)
         //  repeatBtn.classList.toggle('active', this.isRepeat)

        }
        
    }

    app.start()
