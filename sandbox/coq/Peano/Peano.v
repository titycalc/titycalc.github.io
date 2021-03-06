Close Scope nat_scope.

Require Import Setoid.
Require Import Relation_Definitions.

(* Ref: https://proofwiki.org/wiki/Definition:Natural_Numbers *)

(* 1. 0 is a natural number. *)
(* 2. If n is a natural number, succ n is a natural number. *)
Inductive N :=
| zero : N
| succ : N -> N.

Delimit Scope N_scope with N.
Bind Scope N_scope with N.

(* 3. 0 is not succ n. *)
Theorem axiom3 : forall n : N, succ n <> zero.
Proof.
  congruence.
Qed.

(* 4. If succ n = succ m, then n = m. *)
Theorem axiom4 : forall n m : N, succ n = succ m -> n = m.
Proof.
  congruence.
Qed.

(* 5. If (P 0) and (P n -> P (succ n)), then (P n). *)
Theorem axiom5 : forall P : N -> Prop,
                   P zero
                   -> (forall n : N, P n -> P (succ n))
                   -> forall n : N, P n.
Proof.
  intros P H H0 n.
  induction n.
  (* n = 0 *)
    apply H.
  (* n = k + 1 *)
    apply H0.
    apply IHn.
Qed.

Open Scope N_scope.

(* Ref: https://proofwiki.org/wiki/Definition_by_Induction_of_Natural_Number_Addition *)
Fixpoint add (n : N) (m : N) : N :=
  match m with
    | zero => n
    | succ k => succ (add n k)
  end.

Infix "+" := add : N_scope.

Definition one := succ zero.
Definition two := succ one.
Definition three := succ two.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Addition_Commutes_with_Zero *)
Lemma add_n_0_eq_n : forall n : N, n + zero = n.
Proof.
  simpl.
  congruence.
Qed.

Lemma add_0_n_eq_n : forall n : N, zero + n = n.
Proof.
  intro n.
  induction n.
  (* n = 0 *)
    simpl.
    reflexivity.
  (* n = k + 1*)
    simpl.
    rewrite IHn.
    reflexivity.
Qed.

Lemma add_n_0_eq_add_0_n : forall n : N, n + zero = zero + n.
Proof.
  intro n.
  rewrite add_n_0_eq_n.
  rewrite add_0_n_eq_n.
  reflexivity.
Qed.

Lemma add_n_Sm : forall n m : N, n + succ m = succ (n + m).
Proof.
  simpl.
  reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Nuhttps://proofwiki.org/wiki/Natural_Number_Addition_is_Commutativember_Addition_Commutativity_with_Successor *)
Lemma add_Sn_m : forall n m : N, succ n + m = succ (n + m).
Proof.
  intros n m.
  induction m.
  (* n = 0 *)
    rewrite add_n_0_eq_n.
    rewrite add_n_0_eq_n.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite IHm.
    reflexivity.
Qed.

Lemma add_one_r : forall n : N, succ n = n + one.
Proof.
  intro n.
  simpl.
  reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Definition_by_Induction_of_Natural_Number_Addition/Corollary *)
Lemma add_corollary : forall a b : N, (a + b) + one = a + (b + one).
Proof.
  simpl.
  reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Addition_is_Commutative *)
Theorem add_com : forall a b : N, a + b = b + a.
Proof.
  intros a b.
  induction b.
  (* n = 0 *)
    rewrite add_n_0_eq_n.
    rewrite add_0_n_eq_n.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite add_Sn_m.
    rewrite IHb.
    reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Addition_is_Associative *)
Theorem add_assoc : forall a b c : N, (a + b) + c = a + (b + c).
Proof.
  intros a b c.
  induction c.
  (* n = 0 *)
    rewrite add_n_0_eq_n.
    rewrite add_n_0_eq_n.
    reflexivity.
  (* n = k + 1 *)
    rewrite add_n_Sm.
    rewrite add_n_Sm.
    rewrite add_n_Sm.
    rewrite IHc.
    reflexivity.
Qed.

Theorem add_anything_insert : forall a b c : N, a = b -> a + c = b + c.
Proof.
  intros a b c H.
  rewrite H.
  reflexivity.
Qed.

Theorem add_anything_delete : forall a b c : N, a + c = b + c -> a = b.
Proof.
  intros a b c H.
  induction c.
  (* c = 0 *)
    rewrite add_n_0_eq_n in H.
    rewrite add_n_0_eq_n in H.
    apply H.
  (* c = k + 1 *)
    apply IHc.
    apply axiom4.
    simpl in H.
    apply H.
Qed.

Theorem add_anything : forall a b c : N, a = b <-> a + c = b + c.
Proof.
  intros a b c.
  unfold iff.
  split.
  (* a = n -> add a c = add b c *)
    apply add_anything_insert.
  (* add a c = add b c -> a = b *)
    apply add_anything_delete.
Qed.

Theorem add_a_b_c_eq_add_a_c_b : forall a b c : N, a + b + c = a + c + b.
Proof.
  intros a b c.
  rewrite add_assoc.
  rewrite (add_com b).
  rewrite <- add_assoc.
  reflexivity.
Qed.

Close Scope N_scope.
Open Scope N_scope.

(* Ref: https://proofwiki.org/wiki/Definition:Multiplication *)
Fixpoint mult (n : N) (m : N) : N :=
  match m with
    | zero => zero
    | succ k => n + (mult n k)
  end.

Infix "*" := mult : N_scope.

Lemma mult_n_0_eq_0 : forall n : N, n * zero = zero.
Proof.
  simpl.
  reflexivity.
Qed.

Lemma mult_0_n_eq_0 : forall n : N, zero * n = zero.
Proof.
  intro n.
  induction n.
  (* n = 0 *)
    rewrite mult_n_0_eq_0.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite IHn.
    simpl.
    reflexivity.
Qed.

Lemma mult_n_0_eq_mult_0_n : forall n : N, n * zero = zero * n.
Proof.
  intro n.
  rewrite mult_n_0_eq_0.
  rewrite mult_0_n_eq_0.
  reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Multiplication_Commutativity_with_Successor *)
Theorem mult_Sn_m : forall a b : N, succ a * b = b + a * b.
Proof.
  intros a b.
  induction b.
  (* n = 0 *)
    simpl.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite IHb.
    rewrite add_Sn_m.
    rewrite add_one_r.
    rewrite <- (add_assoc a b (a * b)).
    rewrite (add_com a b).
    rewrite (add_assoc b a (a * b)).
    rewrite (add_com b (a + a * b)).
    rewrite (add_assoc (a + a * b) b one).
    rewrite <- add_one_r.
    rewrite add_com.
    reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Multiplication_is_Commutative *)
Theorem mult_com : forall a b : N, a * b = b * a.
Proof.
  intros a b.
  induction b.
  (* n = 0 *)
    apply mult_n_0_eq_mult_0_n.
  (* n = k + 1 *)
    simpl.
    rewrite IHb.
    rewrite <- mult_Sn_m.
    reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Multiplication_Distributes_over_Addition *)
Theorem mult_dist : forall a b c : N, c * (a + b) = c * a + c * b.
Proof.
  intros a b c.
  induction c.
  (* n = 0 *)
    rewrite mult_0_n_eq_0.
    rewrite mult_0_n_eq_0.
    rewrite mult_0_n_eq_0.
    rewrite add_0_n_eq_n.
    reflexivity.
  (* n = k + 1 *)
    rewrite mult_Sn_m.
    rewrite IHc.
    rewrite (add_com a b).
    rewrite (add_assoc b a (c * a + c * b)).
    rewrite <- (add_assoc a (c * a) (c * b)).
    rewrite (add_com (a + c * a) (c * b)).
    rewrite <- (add_assoc b (c * b) (a + c * a)).
    rewrite add_com.
    rewrite <- mult_Sn_m.
    rewrite <- mult_Sn_m.
    reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Multiplication_is_Associative *)
Theorem mult_assoc : forall a b c : N, (a * b) * c = a * (b * c).
Proof.
  intros a b c.
  induction c.
  (* n = 0 *)
    simpl.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite IHc.
    rewrite <- mult_dist.
    reflexivity.
Qed.

Close Scope N_scope.

(* https://proofwiki.org/wiki/Definition:Integer *)

Definition Z : Set := (N * N)%type.

Delimit Scope Z_scope with Z.
Bind Scope Z_scope with Z.

Definition Zeq (z1 z2 : Z) : Prop :=
  let (x1, y1) := z1 in
  let (x2, y2) := z2 in
  add x1 y2 = add x2 y1.

Infix "=" := Zeq : Z_scope.

Theorem Zeq_refl : reflexive Z Zeq.
Proof.
  unfold reflexive.
  intro z.
  unfold Zeq.
  destruct z as [x y].
  reflexivity.
Qed.

Theorem Zeq_sym : symmetric Z Zeq.
Proof.
  unfold symmetric.
  intros z1 z2.
  unfold Zeq.
  intro H.
  destruct z1 as [x1 y1].
  destruct z2 as [x2 y2].
  rewrite H.
  reflexivity.
Qed.

Theorem Zeq_trans : transitive Z Zeq.
Proof.
  unfold transitive.
  unfold Zeq.
  intros z1 z2 z3 H H0.
  destruct z1 as [x1 y1].
  destruct z2 as [x2 y2].
  destruct z3 as [x3 y3].
  apply add_anything_delete with (c := y2).
  rewrite add_a_b_c_eq_add_a_c_b.
  rewrite H.
  rewrite add_a_b_c_eq_add_a_c_b.
  rewrite H0.
  rewrite add_a_b_c_eq_add_a_c_b.
  reflexivity.
Qed.

Add Parametric Relation : Z Zeq
  reflexivity proved by Zeq_refl
  symmetry proved by Zeq_sym
  transitivity proved by Zeq_trans
  as Z_rel.

Definition z_add (z1 z2 : Z) : Z :=
  let (x1, y1) := z1 in
  let (x2, y2) := z2 in
  (add x1 x2, add y1 y2).

Add Parametric Morphism : z_add with
  signature Zeq ==> Zeq ==> Zeq as Z_add_mor.
Proof.
Admitted.

Close Scope Z_scope.

(* References:
 *   http://www.slideshare.net/tmiya/coq-setoid-20110129
 *)