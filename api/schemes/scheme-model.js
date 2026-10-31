
const db = require('../../data/db-config');

// Tüm şemaları getir
function find() {
  return db('schemes')
    .orderBy('scheme_id', 'asc');
}

// ID'ye göre bir şema getir
function findById(scheme_id) {
  return db('schemes')
    .where({ scheme_id })
    .first();
}

// Bir şemaya ait adımları getir
function findSteps(scheme_id) {
  return db('steps')
    .where({ scheme_id })
    .orderBy('step_number', 'asc');
}

// Yeni şema ekle
async function add(scheme) {
  const [scheme_id] = await db('schemes')
    .insert(scheme);

  return findById(scheme_id);
}

// Bir şemaya yeni adım ekle
async function addStep(step) {
  const [step_id] = await db('steps')
    .insert(step);

  return db('steps')
    .where({ step_id })
    .first();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
