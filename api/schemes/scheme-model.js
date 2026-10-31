
const db = require('../../data/db-config');

// Tüm şemaları, adım sayılarıyla birlikte getir
function find() {
  return db('schemes as s')
    .leftJoin('steps as st', 's.scheme_id', 'st.scheme_id')
    .select('s.scheme_id', 's.scheme_name')
    .count('st.step_id as number_of_steps')
    .groupBy('s.scheme_id', 's.scheme_name')
    .orderBy('s.scheme_id', 'asc');
}

// Bir şemayı ve bütün adımlarını getir
async function findById(scheme_id) {
  const scheme = await db('schemes')
    .where({ scheme_id })
    .first();

  if (!scheme) {
    return undefined;
  }

  const steps = await findSteps(scheme_id);

  return {
    ...scheme,
    steps,
  };
}

// Şemaya ait adımları scheme_name ile birlikte getir
function findSteps(scheme_id) {
  return db('steps as st')
    .join('schemes as s', 'st.scheme_id', 's.scheme_id')
    .select(
      'st.step_id',
      'st.scheme_id',
      'st.step_number',
      'st.instructions',
      's.scheme_name'
    )
    .where('st.scheme_id', scheme_id)
    .orderBy('st.step_number', 'asc');
}

// Yeni şema oluştur
async function add(scheme) {
  const [scheme_id] = await db('schemes').insert(scheme);

  return findById(scheme_id);
}

// Yeni adım ekle ve güncel adım listesini getir
async function addStep(scheme_id, step) {
  await db('steps').insert({
    scheme_id,
    step_number: step.step_number,
    instructions: step.instructions,
  });

  return findSteps(scheme_id);
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
