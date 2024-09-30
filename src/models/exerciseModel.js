class Exercise {
  constructor(title, reps, weight) {
    this.title = title.trim().toLowerCase()
    // this.reps = reps.trim().toLowerCase()
    // this.weight = weight.trim().toLowerCase()
    this.reps = Number.parseInt(reps, 10)
    this.weight = Number.parseInt(weight, 10)
  }
}

export default Exercise
