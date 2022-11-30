const express = require('express')
const listen = require('process')
const app = express()
const port = 3000

const projects = require('./models/projects')
const houseplants = require('./models/houseplants')

const fs = require('fs')
app.engine('madeline', (filePath, options, callback) => { 
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' ).replace('#facts#', '<h1>' + options.facts + '</h1>')
    return callback(null, rendered)
  })
})
app.set('views', './views') 
app.set('view engine', 'madeline') 

app.get('/', (req, res) => {
    res.render('template', {title: 'Hey', message: 'Hello There, Sports Fans!', content: 'lets go!'})
})
app.get('/usmnt', (req, res) => {
    res.render('template', {title: "Everyone's Team", message: 'carrying North America rn', content: 'with Canada elimminated and Mexico on the ropes, North America rests all hopes of glory on the yanks.'})
})
app.get('/hype', (req, res) => {
    res.render('test', {title: 'Welcome to the World Cup', message: 'The round of 16 begins in 2 days!', content: 'Who will make it past the first knockout round?', facts: 'There is something riding on every game'})
})
app.get('/new', (req, res) => {
    res.render('template', {title: 'title', message: 'message', content: 'content'})
})
app.get('/crabs', (req, res) => {
    res.render('test', {title: 'Best Crabs', message: 'Horseshoe Crabs', content: 'blue blood, ALIEN prototype, adorably clumsy, supports global bird populations', facts: 'The coolest crab'})
    })
app.get('/dickens', (req, res) => {
    res.render('template', {title: 'Dickens', message: 'A Christmas Carol, Written in 1843, Still Relevant', content: "[of Ignorance and Want] 'Beware them both, and all of their degree, but most of all beware this boy (Ignorance), for on his brown I see that written which is Doom, unless the writing be erased. Deny it! Slander those who tell it ye! Admit it for your factious purposes, and make it worse! And bide the end!"})
})

app.get('/houseplants', (req, res) => {
    res.send(houseplants)
})
app.get('/houseplants/:indexOfHouseplantsArray', (req, res) => {
    res.send(houseplants[req.params.indexOfHouseplantsArray])
})

app.get('/projects', (req, res) => {
    res.send(projects)
})
app.get('/projects/:indexOfProjectsArray', (req, res) => {
    res.send(projects[req.params.indexOfProjectsArray])
})

app.listen(port, () => {
    console.log('listening');
})