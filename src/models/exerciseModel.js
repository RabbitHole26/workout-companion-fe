class Exercise {
  constructor(title, reps, weight) {
    this.title = title.trim().toLowerCase()
    this.reps = reps.trim().toLowerCase()
    this.weight = weight.trim().toLowerCase()
  }
}

export default Exercise
