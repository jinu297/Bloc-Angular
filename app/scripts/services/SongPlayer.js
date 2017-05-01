(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */

        var currentAlbum = Fixtures.getAlbum();

        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };



        SongPlayer.currentSong = null;


        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if (currentSong !== song) {
                setSong(song);   

                currentBuzzObject.play();

                song.playing = true;
            } else if (currentSong === song){
                if (currentBuzzObject.isPaused()){
                    currentBuzzObject.play();
                }
            }
        };

        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
        };

        if (currentSongIndex < 0) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }

        /** This is where assignment 7 begins ***********************************/


        SongPlayer.play = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();




